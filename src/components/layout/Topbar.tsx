import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Share2, 
  Save, 
  Eye, 
  Edit3, 
  Send, 
  Check, 
  Copy, 
  X, 
  AlertTriangle, 
  Calendar,
  Building,
  UploadCloud
} from 'lucide-react';
import { NavigationModule } from '../../types';

interface TopbarProps {
  currentModule: NavigationModule;
  activeWorkspace: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenAssistant: () => void;
  onGlobalSearchSelect: (query: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentModule,
  activeWorkspace,
  isEditMode,
  onToggleEditMode,
  onOpenAssistant,
  onGlobalSearchSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const moduleTitles: Record<NavigationModule, { title: string; subtitle: string }> = {
    dashboard: { title: 'Business Overview', subtitle: 'Your business intelligence and real-time operations at a glance.' },
    assistant: { title: 'Nexa AI Intelligence Assistant', subtitle: 'Universal voice and text knowledge assistant across enterprise documents and data.' },
    policies: { title: 'Company Policies & Compliance', subtitle: 'Dedicated enterprise policy management, semantic search, version comparison and citations.' },
    documents: { title: 'Document Intelligence & Vector Store', subtitle: 'Multi-format document parsing, semantic indexing, chunk inspection and knowledge retrieval.' },
    analytics: { title: 'Business Analytics Engine', subtitle: 'Verified sales, financial, customer cohort, and inventory analytics.' },
    datasources: { title: 'Data Sources & Connectors', subtitle: 'Manage persistent database connections, cloud files, and multi-tenant pipelines.' },
    reports: { title: 'AI Report Generator', subtitle: 'Generate executive summaries, policy audits, and exportable business intelligence reports.' },
    settings: { title: 'Workspace Settings & Security', subtitle: 'Access control, RBAC permissions, audit logging, and AI model configurations.' },
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveDashboard = () => {
    triggerToast('Dashboard configuration and widget layout saved successfully.');
  };

  const handleCopyShareLink = () => {
    setCopiedLink(true);
    triggerToast('Secure workspace link copied to clipboard.');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const notifications = [
    { id: 1, title: 'Policy Review Scheduled', desc: 'Work-from-Home policy review is due in 45 days (Dec 31, 2026).', type: 'info', time: '1 hour ago' },
    { id: 2, title: 'Low Inventory Alert', desc: 'QuantumEdge AI Gateway v2 stock (18) is below reorder point (25).', type: 'warning', time: '3 hours ago' },
    { id: 3, title: 'Data Source Synchronized', desc: 'Production PostgreSQL cluster synced 48,210 rows successfully.', type: 'success', time: 'Today 09:30 AM' },
  ];

  return (
    <header className="h-[70px] bg-[#0B1020]/95 backdrop-blur-md border-b border-[#252D43] px-6 flex items-center justify-between shrink-0 select-none z-20">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-4 right-1/2 translate-x-1/2 z-50 bg-[#141A2D] border border-[#8B5CF6] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <Check className="w-4 h-4 text-[#10B981]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Left: Current Workspace & Title */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wider bg-[#8B5CF6]/15 px-2 py-0.5 rounded-md border border-[#8B5CF6]/30">
              {activeWorkspace}
            </span>
            <span className="text-xs text-[#94A3B8]">/</span>
            <h1 className="text-base font-bold text-white tracking-tight">
              {moduleTitles[currentModule].title}
            </h1>
          </div>
          <p className="text-[11px] text-[#94A3B8] hidden md:block">
            {moduleTitles[currentModule].subtitle}
          </p>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="relative max-w-md w-full mx-4 hidden lg:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchModal(true)}
            placeholder="Search policies, documents, revenue, orders... (Press /)"
            className="w-full bg-[#141A2D] border border-[#252D43] rounded-xl pl-9 pr-9 py-1.5 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#8B5CF6] transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#94A3B8] bg-[#080B18] px-1.5 py-0.5 rounded border border-[#252D43]">
            /
          </kbd>
        </div>

        {/* Global Search Quick Popup */}
        {showSearchModal && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#141A2D] border border-[#252D43] rounded-xl shadow-2xl p-2 z-50">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#252D43]">
              <span className="text-[10px] uppercase font-semibold text-[#94A3B8]">Quick Knowledge Search</span>
              <button onClick={() => setShowSearchModal(false)} className="text-[#94A3B8] hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => {
                  onGlobalSearchSelect('Explain my company leave policy');
                  setShowSearchModal(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#10192B] text-slate-200 flex items-center justify-between"
              >
                <span>📜 Leave & Time-off Policy (24 Days entitlement)</span>
                <span className="text-[10px] text-[#8B5CF6]">Policy RAG</span>
              </button>
              <button
                onClick={() => {
                  onGlobalSearchSelect('Show my revenue trends');
                  setShowSearchModal(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#10192B] text-slate-200 flex items-center justify-between"
              >
                <span>📈 Revenue Trends & Monthly Target Comparison</span>
                <span className="text-[10px] text-[#3B82F6]">Analytics</span>
              </button>
              <button
                onClick={() => {
                  onGlobalSearchSelect('Which products have low stock?');
                  setShowSearchModal(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#10192B] text-slate-200 flex items-center justify-between"
              >
                <span>📦 Inventory Stock & Reorder Alerts</span>
                <span className="text-[10px] text-[#22D3EE]">Inventory</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Quick AI Chat Toggle */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8B5CF6]/20 to-[#3B82F6]/20 hover:from-[#8B5CF6]/30 hover:to-[#3B82F6]/30 border border-[#8B5CF6]/40 text-xs font-semibold text-white shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Ask Nexa AI</span>
        </button>

        {/* Edit / View Mode Toggle */}
        <button
          onClick={onToggleEditMode}
          title={isEditMode ? 'Switch to View Mode' : 'Switch to Edit Mode'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            isEditMode
              ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-sm'
              : 'bg-[#141A2D] text-[#94A3B8] hover:text-white border-[#252D43] hover:bg-[#10192B]'
          }`}
        >
          {isEditMode ? (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Editing</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Only</span>
            </>
          )}
        </button>

        {/* Save Dashboard */}
        <button
          onClick={handleSaveDashboard}
          title="Save Dashboard configuration"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#141A2D] hover:bg-[#10192B] text-[#94A3B8] hover:text-white border border-[#252D43] text-xs font-medium transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Save</span>
        </button>

        {/* Publish Button */}
        <button
          onClick={() => setShowPublishModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#141A2D] hover:bg-[#10192B] text-[#94A3B8] hover:text-white border border-[#252D43] text-xs font-medium transition-all"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Publish</span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#141A2D] hover:bg-[#10192B] text-[#94A3B8] hover:text-white border border-[#252D43] text-xs font-medium transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="p-2 rounded-xl bg-[#141A2D] hover:bg-[#10192B] border border-[#252D43] text-[#94A3B8] hover:text-white transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B5CF6] ring-2 ring-[#0B1020]" />
          </button>

          {/* Notifications Dropdown */}
          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-[#141A2D] border border-[#252D43] rounded-xl shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#252D43]">
                <span className="text-xs font-bold text-white">Notifications</span>
                <span className="text-[10px] text-[#8B5CF6] font-medium">Mark all read</span>
              </div>
              <div className="mt-2 space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-[#080B18] border border-[#252D43] text-left">
                    <p className="text-xs font-semibold text-white">{n.title}</p>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5">{n.desc}</p>
                    <p className="text-[9px] text-slate-500 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#252D43]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#8B5CF6]" />
                Share NexaKnowledge Workspace
              </h3>
              <button onClick={() => setShowShareModal(false)} className="text-[#94A3B8] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#94A3B8] mt-3">
              Invite team members or share read-only access to this enterprise workspace.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <input
                readOnly
                value="https://nexaknowledge.ai/workspace/global-hq?token=nex-89a1"
                className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-xs text-slate-300 select-all"
              />
              <button
                onClick={handleCopyShareLink}
                className="px-3.5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="mt-4 pt-3 border-t border-[#252D43] flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#252D43] text-xs font-semibold text-slate-300 hover:text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#22D3EE]" />
              Publish Workspace Changes
            </h3>
            <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
              Publishing will propagate updated policies, verified analytics models, and custom dashboard layouts to all 384 enterprise members in this organization.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-[#080B18] border border-[#252D43] text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span>Updated Policies:</span>
                <span className="font-semibold text-white">Employee Leave Policy v2.4</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Vector Embeddings:</span>
                <span className="font-semibold text-[#10B981]">Synchronized (ChromaDB)</span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  triggerToast('Workspace published to production environment.');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white text-xs font-semibold hover:opacity-90"
              >
                Confirm Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
