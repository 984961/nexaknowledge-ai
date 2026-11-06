import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  ShieldCheck, 
  Files, 
  ChartNoAxesCombined, 
  Database, 
  FileBarChart, 
  Settings, 
  ChevronDown, 
  Building2, 
  Check, 
  Plus, 
  Sparkles, 
  HelpCircle, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { NavigationModule } from '../../types';

interface SidebarProps {
  currentModule: NavigationModule;
  onSelectModule: (module: NavigationModule) => void;
  activeWorkspace: string;
  onWorkspaceChange: (ws: string) => void;
}

const WORKSPACES = [
  { id: 'ws-1', name: 'My Business (Global HQ)', region: 'US-East', plan: 'Enterprise' },
  { id: 'ws-2', name: 'APAC Regional Operations', region: 'Singapore', plan: 'Enterprise' },
  { id: 'ws-3', name: 'EMEA Legal & Finance Hub', region: 'Frankfurt', plan: 'Enterprise' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  activeWorkspace,
  onWorkspaceChange,
}) => {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const navItems = [
    { id: 'dashboard' as NavigationModule, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'assistant' as NavigationModule, label: 'AI Assistant', icon: Bot, badge: 'Voice' },
    { id: 'policies' as NavigationModule, label: 'Company Policies', icon: ShieldCheck, badge: '7 Active' },
    { id: 'documents' as NavigationModule, label: 'Documents', icon: Files, badge: null },
    { id: 'analytics' as NavigationModule, label: 'Business Analytics', icon: ChartNoAxesCombined, badge: null },
    { id: 'datasources' as NavigationModule, label: 'Data Sources', icon: Database, badge: '6 Connected' },
    { id: 'reports' as NavigationModule, label: 'Reports', icon: FileBarChart, badge: 'AI Gen' },
    { id: 'settings' as NavigationModule, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className="w-[240px] shrink-0 h-screen bg-[#0B1020] border-r border-[#252D43] flex flex-col select-none z-30">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#252D43]/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#3B82F6] to-[#22D3EE] p-[2px] flex items-center justify-center shadow-lg shadow-[#8B5CF6]/20">
            <div className="w-full h-full bg-[#0B1020] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[15px] tracking-tight bg-gradient-to-r from-white via-[#F8FAFC] to-[#CBD5E1] bg-clip-text text-transparent">
                NexaKnowledge
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                AI
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] font-medium tracking-wide">
              Enterprise Intelligence
            </p>
          </div>
        </div>

        {/* Workspace Selector */}
        <div className="mt-3.5 relative">
          <button
            onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg bg-[#141A2D] hover:bg-[#10192B] border border-[#252D43] transition-colors text-left group"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Building2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
              <div className="truncate">
                <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Workspace</p>
                <p className="text-xs font-medium text-[#F8FAFC] truncate">{activeWorkspace}</p>
              </div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 shrink-0 ${workspaceMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Workspace Dropdown */}
          {workspaceMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#141A2D] border border-[#252D43] rounded-xl shadow-2xl p-1.5 z-50">
              <p className="text-[10px] font-semibold text-[#94A3B8] px-2 py-1 uppercase tracking-wider">Switch Workspace</p>
              {WORKSPACES.map(ws => (
                <button
                  key={ws.id}
                  onClick={() => {
                    onWorkspaceChange(ws.name);
                    setWorkspaceMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    activeWorkspace === ws.name ? 'bg-[#8B5CF6]/15 text-white font-medium' : 'text-[#94A3B8] hover:bg-[#10192B] hover:text-white'
                  }`}
                >
                  <div className="truncate text-left">
                    <p className="truncate text-xs">{ws.name}</p>
                    <p className="text-[10px] text-[#94A3B8]">{ws.region} • {ws.plan}</p>
                  </div>
                  {activeWorkspace === ws.name && <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 ml-1" />}
                </button>
              ))}
              <div className="border-t border-[#252D43] mt-1 pt-1">
                <button
                  onClick={() => {
                    alert('Create Workspace dialog opened. Multi-tenant isolation active.');
                    setWorkspaceMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[#8B5CF6] hover:bg-[#8B5CF6]/10 font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Organization...</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Modules (Exactly 8) */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1">
        <div className="px-2 pb-1 text-[10px] font-semibold tracking-wider uppercase text-[#94A3B8]">
          Core Intelligence
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#3B82F6]/10 text-white border border-[#8B5CF6]/40 shadow-sm shadow-[#8B5CF6]/20'
                  : 'text-[#94A3B8] hover:bg-[#141A2D] hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#8B5CF6]' : 'text-[#94A3B8] group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ${
                    item.badge === 'Voice'
                      ? 'bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30'
                      : item.badge.includes('Active')
                      ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                      : 'bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom User Profile & Workspace Info */}
      <div className="p-3 border-t border-[#252D43] bg-[#0B1020]/90 space-y-2.5">
        {/* Help & Documentation */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-[#94A3B8] hover:bg-[#141A2D] hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Help & API Docs</span>
          </div>
          <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
        </button>

        {/* User Profile Card */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#141A2D] border border-[#252D43]">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-xs font-bold text-white shadow-md">
              MR
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#0B1020]" />
          </div>
          <div className="truncate flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white truncate">Mohan Reddy</p>
              <span className="text-[9px] uppercase px-1 rounded bg-[#8B5CF6]/20 text-[#8B5CF6] font-semibold">Admin</span>
            </div>
            <p className="text-[10px] text-[#94A3B8] truncate">mohanreddym491@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
              NexaKnowledge AI Guide
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
              Your Universal Enterprise AI Knowledge, Company Policy & Business Intelligence Platform.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-[#080B18] border border-[#252D43]">
                <p className="font-semibold text-white">1. Ask Questions via Voice or Text</p>
                <p className="text-[11px] text-[#94A3B8]">Click the microphone in the AI Assistant on the right or type any business or policy inquiry.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#080B18] border border-[#252D43]">
                <p className="font-semibold text-white">2. Company Policies with Citations</p>
                <p className="text-[11px] text-[#94A3B8]">Every policy answer provides exact document citations, page numbers, and highlighted excerpts.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#080B18] border border-[#252D43]">
                <p className="font-semibold text-white">3. Intelligent Query Routing</p>
                <p className="text-[11px] text-[#94A3B8]">The system automatically classifies queries across 6 specialized routes (Policy RAG, Doc RAG, SQL Analytics, etc.).</p>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
