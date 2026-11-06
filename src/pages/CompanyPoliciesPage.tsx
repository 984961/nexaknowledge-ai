import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  UploadCloud, 
  FileText, 
  GitCompare, 
  Eye, 
  Calendar, 
  Clock, 
  Building, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  X, 
  ArrowRight,
  BookOpen,
  FileCheck,
  ChevronRight,
  FileCode,
  Tag
} from 'lucide-react';
import { CompanyPolicy, PolicyCategory, PolicyStatus } from '../types';
import { INITIAL_POLICIES } from '../data/mockData';

interface CompanyPoliciesPageProps {
  onAskAI: (query: string) => void;
  selectedPolicyFilter?: string | null;
}

const CATEGORIES: PolicyCategory[] = [
  'HR Policies',
  'Employee Policies',
  'IT and Security Policies',
  'Finance Policies',
  'Legal and Compliance Policies',
  'Workplace Policies',
  'Travel Policies',
];

export const CompanyPoliciesPage: React.FC<CompanyPoliciesPageProps> = ({
  onAskAI,
  selectedPolicyFilter,
}) => {
  const [policies, setPolicies] = useState<CompanyPolicy[]>(INITIAL_POLICIES);
  const [searchQuery, setSearchQuery] = useState(selectedPolicyFilter || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [previewPolicy, setPreviewPolicy] = useState<CompanyPolicy | null>(null);
  const [comparePolicy, setComparePolicy] = useState<CompanyPolicy | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New policy upload form state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPolicyFile, setSelectedPolicyFile] = useState<File | null>(null);
  const [policyFileError, setPolicyFileError] = useState<string | null>(null);
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<PolicyCategory>('HR Policies');
  const [uploadDepartment, setUploadDepartment] = useState('People & Culture');
  const [uploadVersion, setUploadVersion] = useState('v1.0');
  const [uploadContent, setUploadContent] = useState('');

  // Filtering
  const filteredPolicies = policies.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCount = policies.length;
  const publishedCount = policies.filter(p => p.status === 'Published').length;
  const reviewCount = policies.filter(p => p.status === 'Under Review').length;
  const draftCount = policies.filter(p => p.status === 'Draft').length;

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) return;

    const newPolicy: CompanyPolicy = {
      id: `pol-${Date.now()}`,
      name: uploadName,
      category: uploadCategory,
      version: uploadVersion || 'v1.0',
      department: uploadDepartment,
      uploadedAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      reviewDate: '2027-04-01',
      status: 'Published',
      summary: uploadContent.slice(0, 160) || 'Uploaded company policy statement catalogued for semantic RAG indexing.',
      content: uploadContent || 'Official policy content parsed and embedded.',
      fileType: 'pdf',
      fileSize: '1.1 MB',
      sections: [
        { heading: '1. Overview & Guidelines', page: 1, text: uploadContent || 'Policy provisions and compliance standards.' }
      ],
      versions: [
        {
          version: uploadVersion || 'v1.0',
          updatedAt: new Date().toISOString().split('T')[0],
          author: 'Mohan Reddy (Super Admin)',
          changesSummary: 'Initial policy upload to NexaKnowledge repository.',
          content: uploadContent || 'Initial version'
        }
      ]
    };

    setPolicies([newPolicy, ...policies]);
    setShowUploadModal(false);
    setUploadName('');
    setUploadContent('');
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header & Stats Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#141A2D] via-[#10192B] to-[#0B1020] border border-[#252D43]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
              Dedicated Policy Module
            </span>
            <span className="text-xs text-[#94A3B8]">• RAG Retrieval with Citations</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Company Policies & Regulatory Compliance
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
            Upload, manage, search, understand, and compare internal policies with paragraph-level source citations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onAskAI('Summarize my HR policies and explain annual leave rules')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#8B5CF6] border border-[#8B5CF6]/40 text-xs font-semibold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Policy Summary</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/20 transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New Policy</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-3 rounded-2xl bg-[#141A2D] border border-[#252D43]">
          <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Total Policies</span>
          <p className="text-xl font-extrabold text-white mt-1">{totalCount}</p>
        </div>
        <div className="p-3 rounded-2xl bg-[#141A2D] border border-[#10B981]/30 bg-gradient-to-b from-[#10B981]/10 to-transparent">
          <span className="text-[10px] font-semibold text-[#10B981] uppercase tracking-wider">Published</span>
          <p className="text-xl font-extrabold text-white mt-1">{publishedCount}</p>
        </div>
        <div className="p-3 rounded-2xl bg-[#141A2D] border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent">
          <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">Under Review</span>
          <p className="text-xl font-extrabold text-white mt-1">{reviewCount}</p>
        </div>
        <div className="p-3 rounded-2xl bg-[#141A2D] border border-[#252D43]">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Drafts</span>
          <p className="text-xl font-extrabold text-white mt-1">{draftCount}</p>
        </div>
        <div className="p-3 rounded-2xl bg-[#141A2D] border border-[#8B5CF6]/30">
          <span className="text-[10px] font-semibold text-[#8B5CF6] uppercase tracking-wider">Categories</span>
          <p className="text-xl font-extrabold text-white mt-1">7 Active</p>
        </div>
        <div className="p-3 rounded-2xl bg-[#141A2D] border border-[#3B82F6]/30">
          <span className="text-[10px] font-semibold text-[#3B82F6] uppercase tracking-wider">Upcoming Reviews</span>
          <p className="text-xl font-extrabold text-white mt-1">2 in Q4</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#141A2D] border border-[#252D43]">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search policies by keyword, department, or rule..."
              className="w-full bg-[#080B18] border border-[#252D43] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#080B18] border border-[#252D43] text-xs text-white focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
            >
              <option value="All">All 7 Categories</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#080B18] border border-[#252D43] text-xs text-white focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Under Review">Under Review</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Natural Language Trigger Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAI('Compare our travel reimbursement policy with actual expenses')}
            className="text-xs text-[#22D3EE] hover:underline flex items-center gap-1 font-medium"
          >
            <span>Compare Policy vs Expenses</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.id}
            className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              {/* Header: Category & Version */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  {policy.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 bg-[#080B18] px-1.5 py-0.5 rounded border border-[#252D43]">
                    {policy.version}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    policy.status === 'Published'
                      ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                      : policy.status === 'Under Review'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-700/50 text-slate-300'
                  }`}>
                    {policy.status}
                  </span>
                </div>
              </div>

              {/* Policy Title */}
              <h3 className="text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors leading-snug">
                {policy.name}
              </h3>

              {/* Department */}
              <p className="text-[11px] text-[#94A3B8] mt-1 flex items-center gap-1">
                <Building className="w-3 h-3 text-[#3B82F6]" />
                <span>{policy.department}</span>
              </p>

              {/* Summary */}
              <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                {policy.summary}
              </p>
            </div>

            {/* Bottom Meta & Actions */}
            <div className="mt-4 pt-3 border-t border-[#252D43] space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Review: {policy.reviewDate}</span>
                </div>
                <span>{policy.fileSize} • {policy.fileType.toUpperCase()}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  {/* Preview Button */}
                  <button
                    onClick={() => setPreviewPolicy(policy)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#080B18] hover:bg-[#10192B] border border-[#252D43] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>Preview</span>
                  </button>

                  {/* Version Compare Button */}
                  {policy.versions.length > 1 && (
                    <button
                      onClick={() => setComparePolicy(policy)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#080B18] hover:bg-[#10192B] border border-[#252D43] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                      <GitCompare className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span>Compare</span>
                    </button>
                  )}
                </div>

                {/* Ask AI Action */}
                <button
                  onClick={() => onAskAI(`Explain key rules and entitlements in ${policy.name}`)}
                  className="flex items-center gap-1 text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Policy Preview Modal */}
      {previewPolicy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#252D43] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6]">
                    {previewPolicy.category}
                  </span>
                  <span className="text-xs text-[#94A3B8]">{previewPolicy.version}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{previewPolicy.name}</h3>
              </div>
              <button
                onClick={() => setPreviewPolicy(null)}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-200 flex-1">
              <div className="p-3 rounded-xl bg-[#080B18] border border-[#252D43] text-slate-300">
                <p className="font-bold text-white mb-1 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  AI Executive Policy Summary
                </p>
                <p className="leading-relaxed">{previewPolicy.summary}</p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
                  Document Sections & Citations
                </h4>
                {previewPolicy.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-xl bg-[#10192B] border border-[#252D43] space-y-1">
                    <div className="flex items-center justify-between text-white font-semibold">
                      <span>{sec.heading}</span>
                      <span className="text-[#3B82F6] font-normal text-[11px]">Page {sec.page}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{sec.text}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
                  Full Policy Document Body
                </h4>
                <div className="p-3 rounded-xl bg-[#080B18] border border-[#252D43] whitespace-pre-wrap font-mono text-[11px] text-slate-300 leading-relaxed max-h-48 overflow-y-auto">
                  {previewPolicy.content}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#252D43] flex items-center justify-between">
              <button
                onClick={() => {
                  onAskAI(`Explain details and requirements for ${previewPolicy.name}`);
                  setPreviewPolicy(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About This Policy</span>
              </button>
              <button
                onClick={() => setPreviewPolicy(null)}
                className="px-4 py-1.5 rounded-xl bg-[#252D43] text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Version Comparison Modal */}
      {comparePolicy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-[#252D43] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-[#22D3EE]" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Policy Version Comparison: {comparePolicy.name}
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Comparing {comparePolicy.versions[0]?.version} (Current) vs {comparePolicy.versions[1]?.version} (Previous)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setComparePolicy(null)}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="p-3 rounded-xl bg-[#080B18] border border-[#22D3EE]/30">
                <p className="font-bold text-white text-xs mb-1">
                  Change Log Summary:
                </p>
                <p className="text-slate-300 leading-relaxed">
                  {comparePolicy.versions[0]?.changesSummary}
                </p>
              </div>

              {/* Side-by-side versions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#10192B] border border-[#10B981]/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#10B981] text-xs">
                      Current Version: {comparePolicy.versions[0]?.version}
                    </span>
                    <span className="text-[10px] text-slate-400">{comparePolicy.versions[0]?.updatedAt}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Author: {comparePolicy.versions[0]?.author}</p>
                  <div className="p-2.5 rounded-lg bg-[#080B18] border border-[#252D43] text-slate-200 leading-relaxed font-mono text-[11px]">
                    <span className="bg-[#10B981]/20 text-[#10B981] px-1 rounded font-bold">UPDATED:</span>
                    <p className="mt-1">
                      Annual Vacation entitlement increased to 24 paid vacation days per calendar year. Secondary caregiver parental leave expanded to 6 weeks.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10192B] border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-400 text-xs">
                      Previous Version: {comparePolicy.versions[1]?.version}
                    </span>
                    <span className="text-[10px] text-slate-500">{comparePolicy.versions[1]?.updatedAt}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Author: {comparePolicy.versions[1]?.author}</p>
                  <div className="p-2.5 rounded-lg bg-[#080B18] border border-[#252D43] text-slate-400 leading-relaxed font-mono text-[11px]">
                    <span className="bg-red-500/20 text-red-400 px-1 rounded font-bold">ORIGINAL:</span>
                    <p className="mt-1">
                      Annual Vacation entitlement was 20 paid vacation days per calendar year. Secondary caregiver parental leave was 4 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#252D43] flex justify-end">
              <button
                onClick={() => setComparePolicy(null)}
                className="px-4 py-1.5 rounded-xl bg-[#252D43] text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload New Policy Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#252D43]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#8B5CF6]" />
                Upload New Company Policy
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-[#94A3B8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Policy Title</label>
                <input
                  type="text"
                  required
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="e.g. Remote Work Safety & Ergonomics Protocol"
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94A3B8] font-medium mb-1">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#94A3B8] font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={uploadDepartment}
                    onChange={(e) => setUploadDepartment(e.target.value)}
                    placeholder="e.g. Legal & Risk"
                    className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              {/* Native Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const f = e.target.files[0];
                    if (f.size > 25 * 1024 * 1024) {
                      setPolicyFileError('File exceeds 25 MB limit.');
                      return;
                    }
                    setPolicyFileError(null);
                    setSelectedPolicyFile(f);
                    if (!uploadName.trim()) {
                      setUploadName(f.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '));
                    }
                  }
                }}
                accept=".pdf,.docx,.txt"
                className="hidden"
              />

              {policyFileError && (
                <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                  {policyFileError}
                </div>
              )}

              {/* Clickable Drop Zone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const f = e.dataTransfer.files[0];
                    if (f.size > 25 * 1024 * 1024) {
                      setPolicyFileError('File exceeds 25 MB limit.');
                      return;
                    }
                    setPolicyFileError(null);
                    setSelectedPolicyFile(f);
                    if (!uploadName.trim()) {
                      setUploadName(f.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '));
                    }
                  }
                }}
                className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center ${
                  selectedPolicyFile
                    ? 'border-[#10B981]/50 bg-[#10B981]/5'
                    : 'border-[#252D43] bg-[#080B18] hover:border-[#8B5CF6]/60'
                }`}
              >
                <FileText className={`w-8 h-8 mx-auto mb-1.5 ${selectedPolicyFile ? 'text-[#10B981]' : 'text-[#8B5CF6] opacity-80'}`} />
                <p className="font-semibold text-white">
                  {selectedPolicyFile ? selectedPolicyFile.name : 'Click to select or drag & drop policy PDF, DOCX, or TXT'}
                </p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">
                  {selectedPolicyFile ? `${(selectedPolicyFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to Index` : 'Maximum file size: 25 MB'}
                </p>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Policy Content or Key Rules</label>
                <textarea
                  rows={4}
                  value={uploadContent}
                  onChange={(e) => setUploadContent(e.target.value)}
                  placeholder="Paste section text or leave blank to use uploaded file extract..."
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="pt-3 border-t border-[#252D43] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white font-semibold hover:opacity-90 shadow-md"
                >
                  Index & Save Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
