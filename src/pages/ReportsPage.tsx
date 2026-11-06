import React, { useState } from 'react';
import { 
  FileBarChart, 
  Sparkles, 
  Download, 
  Eye, 
  Calendar, 
  FileText, 
  Check, 
  X, 
  Layers, 
  Building2, 
  ArrowRight,
  Printer
} from 'lucide-react';
import { GeneratedReport } from '../types';
import { INITIAL_REPORTS } from '../data/mockData';

const REPORT_TYPES = [
  'Monthly Business Report',
  'Quarterly Business Report',
  'Annual Business Report',
  'Sales Report',
  'Revenue Report',
  'Financial Report',
  'Product Performance Report',
  'Customer Insights Report',
  'Inventory Report',
  'Marketing Report',
  'Company Policy Summary',
  'Policy Comparison Report',
  'Custom AI Report'
];

interface ReportsPageProps {
  onAskAI: (query: string) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onAskAI }) => {
  const [reports, setReports] = useState<GeneratedReport[]>(INITIAL_REPORTS);
  const [selectedReport, setSelectedReport] = useState<GeneratedReport | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form
  const [reportType, setReportType] = useState('Monthly Business Report');
  const [reportDateRange, setReportDateRange] = useState('October 2026 Fiscal Cycle');
  const [customInstructions, setCustomInstructions] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const newReport: GeneratedReport = {
        id: `rep-${Date.now()}`,
        title: `${reportType} (${reportDateRange})`,
        type: reportType,
        generatedAt: new Date().toISOString().split('T')[0],
        dateRange: reportDateRange,
        executiveSummary: `Automated executive briefing compiled by NexaKnowledge AI. Data synthesized across connected PostgreSQL analytics cluster, sales ledgers, and organizational policies. Overall operating health remains strong with sustained margins and zero SOC2 compliance infractions.`,
        keyFindings: [
          'Monthly revenue tracking at +18.2% outperformance against budgeted target.',
          'Enterprise customer logo retention rate sustained at 99.0%.',
          'Company policy review schedules for Q4 are fully on track.',
          'Operational runway stands at 28 months with robust cash flow positive operations.'
        ],
        metrics: [
          { label: 'Calculated Period Revenue', value: '$1,420,800', trend: '+18.2%' },
          { label: 'Gross Profit Margin', value: '74.5%', trend: 'Strong' },
          { label: 'Active Policies Audited', value: '7 Policies', trend: '100% compliant' },
          { label: 'System Uptime SLA', value: '99.98%', trend: 'Nominal' }
        ],
        sourcesCited: [
          'Enterprise_Sales_Master_Dataset_2026.csv',
          'Production PostgreSQL Analytics Cluster',
          'Employee Leave & Time-Off Policy (v2.4)'
        ],
        status: 'Ready'
      };

      setReports([newReport, ...reports]);
      setIsGenerating(false);
      setShowGenerateModal(false);
      setSelectedReport(newReport);
    }, 1200);
  };

  const handleDownloadCSV = (rep: GeneratedReport) => {
    const csvRows = [
      ['Report Title', rep.title],
      ['Type', rep.type],
      ['Generated At', rep.generatedAt],
      ['Date Range', rep.dateRange],
      [''],
      ['Executive Summary'],
      [rep.executiveSummary],
      [''],
      ['Metric', 'Value', 'Trend'],
      ...rep.metrics.map(m => [m.label, m.value, m.trend || '']),
      [''],
      ['Key Findings'],
      ...rep.keyFindings.map((f, i) => [`Finding ${i + 1}`, f]),
      [''],
      ['Sources Cited'],
      ...rep.sourcesCited.map(s => [s])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${rep.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#141A2D] via-[#10192B] to-[#0B1020] border border-[#252D43]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
              Report Intelligence
            </span>
            <span className="text-xs text-[#94A3B8]">• 13 Standardized Enterprise Formats</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            AI Business & Policy Report Generator
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
            Synthesize verified numbers, executive summaries, audit findings, and document citations into exportable PDF, Excel, and CSV reports.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New AI Report</span>
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  {report.type}
                </span>
                <span className="text-[10px] text-[#94A3B8]">
                  Generated: {report.generatedAt}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                {report.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Coverage: {report.dateRange}</p>

              <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                {report.executiveSummary}
              </p>

              {/* Key metrics grid */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {report.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#080B18] border border-[#252D43]">
                    <span className="text-[10px] text-[#94A3B8] block">{m.label}</span>
                    <span className="text-sm font-bold text-white">{m.value}</span>
                    {m.trend && <span className="text-[10px] text-[#10B981] ml-1.5 font-semibold">{m.trend}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom actions */}
            <div className="mt-5 pt-3 border-t border-[#252D43] flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8]">
                {report.sourcesCited.length} Sources Cited
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReport(report)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#080B18] hover:bg-[#10192B] border border-[#252D43] text-xs font-semibold text-slate-300 hover:text-white"
                >
                  <Eye className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => handleDownloadCSV(report)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/40 text-xs font-semibold text-[#8B5CF6] hover:text-white"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-[#252D43] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6]">
                  {selectedReport.type}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedReport.title}</h3>
                <p className="text-xs text-[#94A3B8]">Generated on {selectedReport.generatedAt} • {selectedReport.dateRange}</p>
              </div>
              <button onClick={() => setSelectedReport(null)} className="p-1 rounded-lg text-[#94A3B8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200 flex-1">
              <div>
                <h4 className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-2">
                  Executive Briefing
                </h4>
                <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43] leading-relaxed text-slate-300">
                  {selectedReport.executiveSummary}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Key Metrics Summary
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedReport.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#10192B] border border-[#252D43]">
                      <span className="text-[10px] text-[#94A3B8] block">{m.label}</span>
                      <p className="text-base font-extrabold text-white mt-0.5">{m.value}</p>
                      {m.trend && <span className="text-[10px] text-[#10B981] font-semibold">{m.trend}</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Key Strategic Findings
                </h4>
                <div className="space-y-1.5">
                  {selectedReport.keyFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#080B18] border border-[#252D43]">
                      <span className="w-5 h-5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <p className="text-slate-300 leading-relaxed">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
                  Verifiable Source Documents Cited
                </h4>
                <div className="space-y-1">
                  {selectedReport.sourcesCited.map((source, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-[#22D3EE]">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{source}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#252D43] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadCSV(selectedReport)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#8B5CF6] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={handlePrintReport}
                  className="px-3.5 py-1.5 rounded-xl bg-[#10192B] hover:bg-[#252D43] text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-[#252D43]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-1.5 rounded-xl bg-[#252D43] text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#252D43]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
                Generate AI Intelligence Report
              </h3>
              <button onClick={() => setShowGenerateModal(false)} className="text-[#94A3B8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerate} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
                >
                  {REPORT_TYPES.map(rt => (
                    <option key={rt} value={rt}>{rt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Date Range</label>
                <input
                  type="text"
                  required
                  value={reportDateRange}
                  onChange={(e) => setReportDateRange(e.target.value)}
                  placeholder="e.g. October 1 - October 31, 2026"
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Data Sources to Include</label>
                <div className="p-2.5 rounded-xl bg-[#080B18] border border-[#252D43] space-y-1 text-slate-300">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-[#8B5CF6]" />
                    <span>Company Policies (Leave, InfoSec, Travel per diems)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-[#8B5CF6]" />
                    <span>PostgreSQL Analytics Cluster (Revenue, Orders, Margins)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-[#8B5CF6]" />
                    <span>Uploaded Documents & Financial Reports</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Custom Directives for Gemini AI</label>
                <textarea
                  rows={2}
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="e.g. Focus on APAC regional growth and travel expense compliance..."
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="pt-3 border-t border-[#252D43] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white font-semibold flex items-center gap-1.5 shadow-md"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing Intelligence...</span>
                    </>
                  ) : (
                    <span>Generate Report</span>
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
