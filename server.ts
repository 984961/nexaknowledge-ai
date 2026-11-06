import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { 
  getStoredDocuments, 
  getStoredDocumentById, 
  deleteStoredDocument, 
  processAndIngestDocument 
} from './src/server/documentStore.ts';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '50mb' }));

  // Initialize server-side Gemini client
  let geminiAI: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      geminiAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      console.log('Gemini API initialized with model gemini-3.8-flash');
    } catch (e) {
      console.warn('Could not initialize GoogleGenAI client:', e);
    }
  }

  // Server health endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      app: 'NexaKnowledge AI',
      geminiAvailable: !!geminiAI,
      timestamp: new Date().toISOString(),
    });
  });

  // Documents API endpoints
  app.get('/api/documents', (req, res) => {
    res.json({ documents: getStoredDocuments() });
  });

  app.get('/api/documents/:id', (req, res) => {
    const doc = getStoredDocumentById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ document: doc });
  });

  app.post('/api/documents/upload', async (req, res) => {
    try {
      const { category, fileType, fileSize, fileSizeBytes, base64Data, textContent } = req.body;
      const name = req.body.name || req.body.fileName;
      if (!name) {
        return res.status(400).json({ error: 'Filename is required' });
      }

      const doc = await processAndIngestDocument(
        {
          name,
          category,
          fileType,
          fileSize: fileSize || '1.0 MB',
          fileSizeBytes: fileSizeBytes || 1024,
          base64Data,
          textContent,
        },
        geminiAI
      );

      return res.status(201).json({
        success: true,
        document: doc,
        message: `Document '${name}' parsed and indexed into knowledge base successfully.`,
      });
    } catch (err: any) {
      console.error('Error during document ingestion:', err.message);
      return res.status(400).json({
        error: err.message || 'Failed to ingest and vectorize document.',
      });
    }
  });

  app.delete('/api/documents/:id', (req, res) => {
    const deleted = deleteStoredDocument(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ success: true, message: 'Document removed from knowledge store' });
  });

  // Intelligent AI query router & RAG endpoint
  app.post('/api/ai/chat', async (req, res) => {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const lower = query.toLowerCase();

    // Check if query matches any uploaded document
    const allStoredDocs = getStoredDocuments();
    const matchedDoc = allStoredDocs.find(
      (d) =>
        lower.includes(d.name.toLowerCase()) ||
        lower.includes(d.name.replace(/\.[^.]+$/, '').toLowerCase()) ||
        (d.extractedText && lower.split(' ').filter((w: string) => w.length > 4).some((w: string) => d.extractedText.toLowerCase().includes(w)))
    );

    // Determine query route
    let route: string = matchedDoc ? 'General Document RAG' : 'General Document RAG';
    if (
      (lower.includes('policy') || lower.includes('allowance') || lower.includes('limit')) &&
      (lower.includes('expense') || lower.includes('actual') || lower.includes('revenue') || lower.includes('spend'))
    ) {
      route = 'Combined Intelligence';
    } else if (lower.includes('dashboard')) {
      route = 'Dashboard Generator';
    } else if (lower.includes('report')) {
      route = 'Report Generator';
    } else if (
      lower.includes('policy') || lower.includes('leave') || lower.includes('vacation') ||
      lower.includes('wfh') || lower.includes('work from home') || lower.includes('reimbursement') ||
      lower.includes('parental') || lower.includes('sick') || lower.includes('laptop') ||
      lower.includes('password') || lower.includes('per diem') || lower.includes('whistleblower') ||
      lower.includes('gdpr') || lower.includes('hr') || lower.includes('conduct')
    ) {
      route = 'Company Policy RAG';
    } else if (
      lower.includes('revenue') || lower.includes('sales') || lower.includes('order') ||
      lower.includes('customer') || lower.includes('inventory') || lower.includes('stock') ||
      lower.includes('profit') || (lower.includes('product') && !matchedDoc)
    ) {
      route = 'Business Analytics';
    }

    // Call Gemini API if key is present
    if (geminiAI) {
      try {
        let uploadedDocsContext = '';
        if (allStoredDocs.length > 0) {
          uploadedDocsContext = allStoredDocs
            .slice(0, 6)
            .map((d) => `Document '${d.name}' (${d.fileType}): ${d.summary}\nSample: ${d.extractedText.slice(0, 500)}`)
            .join('\n---\n');
        }

        const systemPrompt = `You are NexaKnowledge AI, an Enterprise AI Knowledge, Company Policy & Business Intelligence Platform assistant.
You provide grounded, factual answers based on company policies, uploaded documents, and verified business data.
Never invent policies, rules, or metrics.
When answering queries, cite:
Source: [Document or Policy Name]
Page: [Page or Section Number]
Section: [Section Heading]
The active route for this query is: [Route: ${route}].

Uploaded Knowledge Documents in Store:
${uploadedDocsContext || 'None'}

Keep responses professional, concise, structured, and helpful.`;

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 6000)
        );
        const apiPromise = geminiAI.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${systemPrompt}\n\nUser Question: ${query}`,
        });

        const response: any = await Promise.race([apiPromise, timeoutPromise]);
        const generatedText = response?.text || '';

        // Citations for policy questions and uploaded documents
        let citations: any = undefined;
        if (matchedDoc) {
          citations = [
            {
              policyName: matchedDoc.name,
              page: 1,
              section: matchedDoc.structuredData ? 'Structured Dataset Schema' : 'Extracted Content',
              sourcePassage: matchedDoc.summary,
              version: 'Indexed',
            },
          ];
        } else if (route === 'Company Policy RAG' || route === 'Combined Intelligence') {
          if (lower.includes('leave') || lower.includes('vacation')) {
            citations = [
              {
                policyName: 'Employee Leave & Time-Off Policy.pdf',
                page: 2,
                section: '2. Annual Vacation Leave (24 Days)',
                sourcePassage: 'Full-time employees accrue 24 paid vacation days per calendar year, calculated on a pro-rata basis of 2.0 days per month...',
                version: 'v2.4',
              },
            ];
          } else if (lower.includes('reimbursement') || lower.includes('travel') || lower.includes('expense')) {
            citations = [
              {
                policyName: 'Corporate Expense Reimbursement & Travel Policy.pdf',
                page: 2,
                section: '2. Daily Meal Allowances & 4. Approval Thresholds',
                sourcePassage: 'Domestic travel daily allowance: $85 per day. International travel allowance: $130 per day...',
                version: 'v2.2',
              },
            ];
          }
        }

        return res.json({
          text: generatedText,
          route,
          citations,
        });
      } catch (err: any) {
        console.error('Gemini API call failed, falling back to local deterministic response:', err.message);
      }
    }

    // Deterministic fallback response if Gemini API key not yet configured
    let fallbackText = `I have analyzed your request under [Route: ${route}].`;
    let citations: any = undefined;

    if (matchedDoc) {
      fallbackText = `Found verified context in uploaded document **${matchedDoc.name}** (${matchedDoc.fileType.toUpperCase()}):\n\n${matchedDoc.summary}\n\n${
        matchedDoc.structuredData
          ? `• **Total Records:** ${matchedDoc.structuredData.totalRows} rows across ${matchedDoc.structuredData.totalColumns} columns.\n• **Columns:** ${matchedDoc.structuredData.headers.slice(0, 8).join(', ')}.\n• **Sample Insights:** ${matchedDoc.structuredData.numericMetrics?.map(m => `${m.column}: sum=${m.sum}`).join(', ') || 'Structured fields indexed.'}`
          : `• **Extracted Content Preview:** ${matchedDoc.extractedText.slice(0, 300)}...`
      }`;
      citations = [
        {
          policyName: matchedDoc.name,
          page: 1,
          section: matchedDoc.structuredData ? 'Structured Dataset Ledger' : 'Extracted Text Chunks',
          sourcePassage: matchedDoc.summary,
          version: 'Indexed',
        },
      ];
    } else if (route === 'Company Policy RAG') {
      if (lower.includes('leave') || lower.includes('vacation')) {
        fallbackText = `According to the **Employee Leave & Time-Off Policy (v2.4)**:
• Full-time employees accrue **24 paid vacation days** annually (2.0 days/month).
• Carryover of up to 5 days is permitted into Q1, expiring March 31.
• Sick leave: 12 paid days per year (doctor cert required for >2 consecutive days).
• Parental leave: 16 weeks fully paid for primary caregivers; 6 weeks for secondary caregivers.`;
        citations = [
          {
            policyName: 'Employee Leave & Time-Off Policy.pdf',
            page: 2,
            section: '2. Annual Vacation Leave',
            sourcePassage: 'Full-time employees accrue 24 paid vacation days per calendar year...',
            version: 'v2.4',
          },
        ];
      } else {
        fallbackText = `NexaKnowledge AI manages 7 active organizational policies across HR, Security, Finance, Legal, and Workplace operations. All policies provide verifiable paragraph citations.`;
      }
    } else if (route === 'Business Analytics') {
      fallbackText = `**Business Performance Summary:**
• October Revenue: **$1,420,800** (+18.2% vs budget).
• Gross Profit Margin: **74.5%**.
• Enterprise Clients: **384 organizations** (Net Retention Rate 128%).`;
    }

    return res.json({
      text: fallbackText,
      route,
      citations,
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`NexaKnowledge AI running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
