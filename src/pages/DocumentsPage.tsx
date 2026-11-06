import React, { useState, useEffect, useRef } from 'react';
import { 
  Files, 
  UploadCloud, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles, 
  Eye, 
  X, 
  Filter, 
  FileSpreadsheet,
  FileCode,
  Tag,
  AlertTriangle,
  RotateCcw,
  Trash2,
  Table,
  BarChart2,
  ArrowRight,
  Check
} from 'lucide-react';
import { DocumentItem } from '../types';
import { INITIAL_DOCUMENTS } from '../data/mockData';
import { 
  fetchAllDocuments, 
  uploadDocumentToServer, 
  deleteDocumentFromServer, 
  formatBytes, 
  detectFileType,
  MAX_FILE_SIZE_BYTES
} from '../services/documentService';

interface DocumentsPageProps {
  onAskAI: (query: string) => void;
  onDocumentUploaded?: (doc: DocumentItem) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({ onAskAI, onDocumentUploaded }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [previewTab, setPreviewTab] = useState<'summary' | 'table' | 'text'>('summary');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docCategory, setDocCategory] = useState('Operations');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Load documents from backend on mount
  useEffect(() => {
    let mounted = true;
    fetchAllDocuments().then((docs) => {
      if (mounted && docs && docs.length > 0) {
        setDocuments(docs);
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleFileSelection = (file: File) => {
    setFileError(null);
    setUploadSuccessMsg(null);

    // 1. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File exceeds maximum permitted limit of 50 MB (Selected: ${formatBytes(file.size)}).`);
      setSelectedFile(null);
      return;
    }

    // 2. Validate Extension
    const type = detectFileType(file.name);
    if (!type) {
      setFileError(`Unsupported format '.${file.name.split('.').pop()}'. Supported formats: PDF, DOCX, CSV, XLSX, JSON, TXT.`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);

    // Auto-suggest category based on type
    if (type === 'csv' || type === 'xlsx') {
      setDocCategory('Sales & Financial Data');
    } else if (type === 'json') {
      setDocCategory('System & API Records');
    } else if (type === 'pdf' || type === 'docx') {
      setDocCategory('Executive & Legal Reports');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setFileError(null);
    setUploadProgress(10);
    setUploadStage('Initiating file ingestion...');

    try {
      const newDoc = await uploadDocumentToServer(
        selectedFile,
        docCategory,
        (stage, percent) => {
          setUploadStage(stage);
          setUploadProgress(percent);
        }
      );

      // Add to documents list
      setDocuments((prev) => [newDoc, ...prev.filter((d) => d.id !== newDoc.id)]);
      onDocumentUploaded?.(newDoc);

      setUploadSuccessMsg(`'${newDoc.name}' indexed successfully (${newDoc.chunkCount} vector chunks).`);
      setIsUploading(false);

      setTimeout(() => {
        setShowUploadModal(false);
        setSelectedFile(null);
        setUploadProgress(0);
        setUploadStage('');
        setUploadSuccessMsg(null);
      }, 1200);
    } catch (err: any) {
      setIsUploading(false);
      setFileError(err.message || 'Upload failed. Please verify the file and retry.');
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Remove this document from the knowledge base?')) {
      await deleteDocumentFromServer(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      if (previewDoc?.id === id) {
        setPreviewDoc(null);
      }
    }
  };

  const filteredDocs = documents.filter((d) => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'csv':
      case 'xlsx':
        return <FileSpreadsheet className="w-5 h-5 text-[#22D3EE]" />;
      case 'json':
        return <FileCode className="w-5 h-5 text-amber-400" />;
      default:
        return <FileText className="w-5 h-5 text-[#8B5CF6]" />;
    }
  };

  const totalChunks = documents.reduce((sum, d) => sum + (d.chunkCount || 1), 0);
  const totalIndexed = documents.filter((d) => d.status === 'Indexed').length;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#141A2D] via-[#10192B] to-[#0B1020] border border-[#252D43]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30">
              Document Intelligence
            </span>
            <span className="text-xs text-[#94A3B8]">• ChromaDB & Vector Embeddings</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Enterprise Documents & Knowledge Base
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
            Upload PDFs, DOCX files, spreadsheets (CSV, XLSX), and JSON data. Ingested files are automatically chunked, vectorized, and semantically indexed for AI search.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onAskAI('Search across all uploaded documents and summarize Q3 revenue achievements')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#8B5CF6] border border-[#8B5CF6]/40 text-xs font-semibold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Document Search</span>
          </button>
          <button
            onClick={() => {
              setSelectedFile(null);
              setFileError(null);
              setUploadSuccessMsg(null);
              setShowUploadModal(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/20 transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#141A2D] border border-[#252D43]">
          <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Total Documents</span>
          <p className="text-xl font-extrabold text-white mt-1">{documents.length}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#141A2D] border border-[#10B981]/30">
          <span className="text-[10px] font-semibold text-[#10B981] uppercase tracking-wider">Indexed & Vectorized</span>
          <p className="text-xl font-extrabold text-white mt-1">{totalIndexed}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#141A2D] border border-[#22D3EE]/30">
          <span className="text-[10px] font-semibold text-[#22D3EE] uppercase tracking-wider">Semantic Vector Chunks</span>
          <p className="text-xl font-extrabold text-white mt-1">{totalChunks} Chunks</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#141A2D] border border-[#8B5CF6]/30">
          <span className="text-[10px] font-semibold text-[#8B5CF6] uppercase tracking-wider">Structured & RAG Store</span>
          <p className="text-xl font-extrabold text-white mt-1">Active</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#141A2D] border border-[#252D43]">
        <div className="flex items-center gap-2.5 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by title, extracted contents, or metadata..."
              className="w-full bg-[#080B18] border border-[#252D43] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#080B18] border border-[#252D43] text-xs text-white focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Financial Analysis">Financial Analysis</option>
            <option value="Sales Data">Sales Data</option>
            <option value="Sales & Financial Data">Sales & Financial Data</option>
            <option value="Engineering & Architecture">Engineering & Architecture</option>
            <option value="Operations">Operations</option>
            <option value="Customer Intelligence">Customer Intelligence</option>
            <option value="Executive & Legal Reports">Executive & Legal Reports</option>
            <option value="System & API Records">System & API Records</option>
          </select>
        </div>
      </div>

      {/* Document Cards Table/Grid */}
      <div className="space-y-3">
        {filteredDocs.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#141A2D] border border-[#252D43]">
            <Files className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">No documents match your query.</p>
            <p className="text-xs text-slate-400 mt-1">Upload a new document or adjust your search filter.</p>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43] hover:border-[#8B5CF6]/50 transition-all flex flex-wrap items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5 min-w-[280px] flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#080B18] border border-[#252D43] flex items-center justify-center shrink-0">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                      {doc.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                      {doc.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {doc.status}
                    </span>
                    {doc.structuredData && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30 font-semibold flex items-center gap-1">
                        <Table className="w-3 h-3" />
                        {doc.structuredData.totalRows} Rows
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                    {doc.summary}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-[#94A3B8]">
                    <span>Uploaded: {doc.uploadedAt}</span>
                    <span>•</span>
                    <span>Size: {doc.fileSize}</span>
                    <span>•</span>
                    <span className="text-[#22D3EE] flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {doc.chunkCount} Vector Chunks
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setPreviewDoc(doc);
                    setPreviewTab(doc.structuredData ? 'table' : 'summary');
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#080B18] hover:bg-[#10192B] border border-[#252D43] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => onAskAI(`Analyze and extract key information from ${doc.name}`)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/40 text-xs font-semibold text-[#8B5CF6] hover:text-white transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Analyze</span>
                </button>
                <button
                  onClick={(e) => handleDelete(doc.id, e)}
                  title="Delete Document"
                  className="p-1.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-[#252D43] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#080B18] border border-[#252D43] flex items-center justify-center">
                  {getFileIcon(previewDoc.fileType)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white truncate max-w-md">{previewDoc.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6] uppercase">
                      {previewDoc.fileType}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    {previewDoc.category} • {previewDoc.fileSize} • {previewDoc.chunkCount} Vector Chunks
                  </p>
                </div>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-1 rounded-lg text-[#94A3B8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs if structured data is present */}
            {previewDoc.structuredData && (
              <div className="flex items-center gap-2 px-5 pt-3 border-b border-[#252D43] text-xs">
                <button
                  onClick={() => setPreviewTab('table')}
                  className={`flex items-center gap-1.5 pb-2 font-semibold border-b-2 transition-all ${
                    previewTab === 'table' ? 'border-[#22D3EE] text-[#22D3EE]' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Interactive Table ({previewDoc.structuredData.totalRows} Rows)</span>
                </button>
                <button
                  onClick={() => setPreviewTab('summary')}
                  className={`flex items-center gap-1.5 pb-2 font-semibold border-b-2 transition-all ${
                    previewTab === 'summary' ? 'border-[#8B5CF6] text-[#8B5CF6]' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Executive Summary</span>
                </button>
                <button
                  onClick={() => setPreviewTab('text')}
                  className={`flex items-center gap-1.5 pb-2 font-semibold border-b-2 transition-all ${
                    previewTab === 'text' ? 'border-[#3B82F6] text-[#3B82F6]' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Parsed Text Payload</span>
                </button>
              </div>
            )}

            {/* Content Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-200 flex-1">
              {/* Table View Tab */}
              {previewDoc.structuredData && previewTab === 'table' && (
                <div className="space-y-4">
                  {/* Column Header Pills */}
                  <div>
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1.5">
                      Detected Columns ({previewDoc.structuredData.totalColumns})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {previewDoc.structuredData.headers.map((h, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#080B18] border border-[#252D43] text-slate-300 font-mono text-[11px]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Calculated Metrics if available */}
                  {previewDoc.structuredData.numericMetrics && previewDoc.structuredData.numericMetrics.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider block mb-1.5">
                        Quantitative Column Metrics
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {previewDoc.structuredData.numericMetrics.slice(0, 6).map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-[#080B18] border border-[#252D43] text-[11px]">
                            <span className="text-slate-400 font-medium block truncate">{m.column}</span>
                            <div className="mt-1 space-y-0.5 text-slate-300">
                              {m.sum !== undefined && <div className="flex justify-between"><span>Sum:</span><span className="font-bold text-white">{m.sum.toLocaleString()}</span></div>}
                              {m.avg !== undefined && <div className="flex justify-between"><span>Avg:</span><span className="text-white">{m.avg.toLocaleString()}</span></div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Table Rows Preview */}
                  <div>
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1.5">
                      Records Preview (Displaying up to {previewDoc.structuredData.rowsPreview.length} rows)
                    </span>
                    <div className="overflow-x-auto rounded-xl border border-[#252D43] bg-[#080B18]">
                      <table className="w-full text-left text-xs divide-y divide-[#252D43]">
                        <thead className="bg-[#10192B] text-slate-300">
                          <tr>
                            <th className="py-2 px-3 font-semibold text-[11px]">#</th>
                            {previewDoc.structuredData.headers.map((h, i) => (
                              <th key={i} className="py-2 px-3 font-semibold text-[11px] whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#252D43] text-slate-300">
                          {previewDoc.structuredData.rowsPreview.slice(0, 30).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#141A2D]">
                              <td className="py-2 px-3 text-slate-500 font-mono text-[10px]">{rIdx + 1}</td>
                              {previewDoc.structuredData?.headers.map((h, cIdx) => (
                                <td key={cIdx} className="py-2 px-3 whitespace-nowrap max-w-xs truncate">
                                  {String(row[h] !== undefined && row[h] !== null ? row[h] : '')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary View Tab */}
              {(!previewDoc.structuredData || previewTab === 'summary') && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43]">
                    <p className="font-bold text-white mb-1.5 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      Executive Document Summary
                    </p>
                    <p className="text-slate-300 leading-relaxed">{previewDoc.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
                      Extracted Text Content & Chunks
                    </h4>
                    <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43] font-mono text-[11px] text-slate-300 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                      {previewDoc.extractedText}
                    </div>
                  </div>
                </div>
              )}

              {/* Text View Tab */}
              {previewDoc.structuredData && previewTab === 'text' && (
                <div>
                  <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
                    Raw Semantic Payload
                  </h4>
                  <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43] font-mono text-[11px] text-slate-300 leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap">
                    {previewDoc.extractedText}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#252D43] flex items-center justify-between">
              <button
                onClick={() => {
                  onAskAI(`Extract all metrics, conclusions, and insights from ${previewDoc.name}`);
                  setPreviewDoc(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About This Document</span>
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 rounded-xl bg-[#252D43] text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#252D43]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#3B82F6]" />
                Upload New Document
              </h3>
              <button 
                onClick={() => {
                  if (!isUploading) {
                    setShowUploadModal(false);
                  }
                }}
                disabled={isUploading}
                className="text-[#94A3B8] hover:text-white disabled:opacity-40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4 text-xs">
              {/* Error Alert */}
              {fileError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-xs">Upload Validation Error</p>
                    <p className="text-[11px] mt-0.5 text-red-300">{fileError}</p>
                  </div>
                </div>
              )}

              {/* Success Alert */}
              {uploadSuccessMsg && (
                <div className="p-3 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <p className="font-semibold text-xs">{uploadSuccessMsg}</p>
                </div>
              )}

              {/* Native Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileSelection(e.target.files[0]);
                  }
                }}
                accept=".pdf,.docx,.csv,.xlsx,.xls,.json,.txt"
                className="hidden"
              />

              {/* Clickable Drag-and-Drop Area */}
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center select-none ${
                  isDragging
                    ? 'border-[#22D3EE] bg-[#22D3EE]/10'
                    : selectedFile
                    ? 'border-[#10B981]/50 bg-[#10B981]/5'
                    : 'border-[#252D43] bg-[#080B18] hover:border-[#3B82F6]/60 hover:bg-[#10192B]'
                }`}
              >
                <UploadCloud className={`w-9 h-9 mx-auto mb-2 transition-transform ${
                  isDragging ? 'scale-110 text-[#22D3EE]' : selectedFile ? 'text-[#10B981]' : 'text-[#3B82F6] opacity-80'
                }`} />
                <p className="font-bold text-white text-sm">
                  {selectedFile ? 'Click to change selected file' : 'Click to select or drag & drop a document'}
                </p>
                <p className="text-[11px] text-[#94A3B8] mt-1">
                  Supports PDF, DOCX, CSV, XLSX, JSON, TXT up to 50 MB
                </p>
              </div>

              {/* Selected File Card Details */}
              {selectedFile && (
                <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-[#141A2D] border border-[#252D43] flex items-center justify-center shrink-0">
                      {getFileIcon(detectFileType(selectedFile.name) || 'txt')}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-white text-xs truncate">{selectedFile.name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-[#94A3B8] mt-0.5">
                        <span className="font-semibold text-slate-300">{formatBytes(selectedFile.size)}</span>
                        <span>•</span>
                        <span className="uppercase text-[#22D3EE] font-bold">{detectFileType(selectedFile.name)}</span>
                        <span>•</span>
                        <span className="text-[#10B981] font-semibold">Valid format</span>
                      </div>
                    </div>
                  </div>

                  {!isUploading && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFileError(null);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      title="Clear selection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Category Selector */}
              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Knowledge Category</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  disabled={isUploading}
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6] disabled:opacity-50"
                >
                  <option value="Operations">Operations</option>
                  <option value="Sales & Financial Data">Sales & Financial Data</option>
                  <option value="Financial Analysis">Financial Analysis</option>
                  <option value="Engineering & Architecture">Engineering & Architecture</option>
                  <option value="Customer Intelligence">Customer Intelligence</option>
                  <option value="Executive & Legal Reports">Executive & Legal Reports</option>
                  <option value="System & API Records">System & API Records</option>
                  <option value="General Knowledge">General Knowledge</option>
                </select>
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#3B82F6] font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      {uploadStage}
                    </span>
                    <span className="font-bold text-white">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#080B18] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#252D43] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || isUploading || !!fileError}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] disabled:opacity-40 text-white font-semibold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Ingesting & Vectorizing...</span>
                    </>
                  ) : (
                    <span>Ingest & Vectorize</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
