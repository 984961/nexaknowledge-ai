import React, { useState } from 'react';
import { 
  Settings, 
  Building, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Mic, 
  Lock, 
  Key, 
  Save, 
  Check, 
  FileText, 
  Clock, 
  Activity,
  UserPlus
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'users' | 'access' | 'ai' | 'voice' | 'security'>('workspace');
  const [savedNotice, setSavedNotice] = useState(false);

  // Settings form states
  const [workspaceName, setWorkspaceName] = useState('My Business (Global HQ)');
  const [industry, setIndustry] = useState('Enterprise Technology & Cloud Services');
  const [currency, setCurrency] = useState('USD ($)');
  const [timezone, setTimezone] = useState('America/New_York (UTC-5)');

  // AI settings
  const [modelChoice, setModelChoice] = useState('gemini-3.8-flash');
  const [thinkingLevel, setThinkingLevel] = useState('MEDIUM');
  const [semanticThreshold, setSemanticThreshold] = useState('0.82');

  // Voice settings
  const [voiceLang, setVoiceLang] = useState('en');
  const [autoSpeak, setAutoSpeak] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const users = [
    { id: 1, name: 'Mohan Reddy', email: 'mohanreddym491@gmail.com', role: 'Super Admin', dept: 'Executive', status: 'Active' },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@nexaknowledge.ai', role: 'Compliance Officer', dept: 'People & Culture', status: 'Active' },
    { id: 3, name: 'Victoria Sterling', email: 'victoria.s@nexaknowledge.ai', role: 'Finance Director', dept: 'Finance & Treasury', status: 'Active' },
    { id: 4, name: 'Dr. Tariq Al-Mansoor', email: 'tariq.m@nexaknowledge.ai', role: 'Security Admin', dept: 'InfoSec', status: 'Active' },
  ];

  const auditLogs = [
    { id: 'aud-1', user: 'Mohan Reddy', action: 'Accessed Employee Leave Policy v2.4', time: '10 mins ago', ip: '192.168.1.45', status: 'Authorized' },
    { id: 'aud-2', user: 'Victoria Sterling', action: 'Exported Monthly Business Report CSV', time: '45 mins ago', ip: '10.0.4.12', status: 'Authorized' },
    { id: 'aud-3', user: 'System Agent', action: 'Synchronized PostgreSQL analytics cluster', time: '2 hours ago', ip: 'Internal RPC', status: 'Success' },
    { id: 'aud-4', user: 'Sarah Jenkins', action: 'Updated Work-from-Home Policy review date', time: '5 hours ago', ip: '192.168.1.88', status: 'Authorized' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#141A2D] via-[#10192B] to-[#0B1020] border border-[#252D43]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
              Workspace Administration
            </span>
            <span className="text-xs text-[#94A3B8]">• RBAC & Security Boundaries</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Settings, Governance & Security Configuration
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
            Configure multi-tenant organization parameters, user roles, document-level security, Gemini AI parameters, and audit logging.
          </p>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-semibold animate-pulse">
            <Check className="w-4 h-4" />
            <span>Settings updated and propagated.</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-[#252D43]">
        {[
          { id: 'workspace', label: 'Workspace Profile', icon: Building },
          { id: 'users', label: 'User Management & Roles', icon: Users },
          { id: 'access', label: 'Access Control & RBAC', icon: ShieldCheck },
          { id: 'ai', label: 'AI Model Configuration', icon: Sparkles },
          { id: 'voice', label: 'Voice & Speech Settings', icon: Mic },
          { id: 'security', label: 'Security & Audit Logs', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                isActive
                  ? 'bg-[#141A2D] text-white border border-[#8B5CF6]/40 shadow-sm'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#141A2D]/50 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#8B5CF6]' : 'text-[#94A3B8]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Workspace Profile Tab */}
      {activeTab === 'workspace' && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#141A2D] border border-[#252D43] max-w-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2">Organization & Workspace Identity</h3>
          <div>
            <label className="block text-[#94A3B8] font-medium mb-1">Organization / Workspace Name</label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>
          <div>
            <label className="block text-[#94A3B8] font-medium mb-1">Industry Vertical</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#94A3B8] font-medium mb-1">Reporting Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="INR (₹)">INR (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-[#94A3B8] font-medium mb-1">Primary Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
              >
                <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                <option value="Europe/London (UTC+0)">Europe/London (UTC+0)</option>
                <option value="Asia/Kolkata (UTC+5:30)">Asia/Kolkata (UTC+5:30)</option>
                <option value="Asia/Singapore (UTC+8)">Asia/Singapore (UTC+8)</option>
              </select>
            </div>
          </div>
          <div className="pt-3 border-t border-[#252D43] flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Workspace Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-2xl bg-[#141A2D] border border-[#252D43] space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Active Enterprise Members (4)</h3>
              <p className="text-xs text-[#94A3B8]">Manage organization roles and policy review delegations</p>
            </div>
            <button
              onClick={() => alert('Add Member dialog opened.')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B5CF6] text-white font-semibold hover:bg-[#7C3AED]"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite Member</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-[#252D43] text-[#94A3B8]">
                <tr>
                  <th className="py-2.5">Name</th>
                  <th className="py-2.5">Email</th>
                  <th className="py-2.5">Department</th>
                  <th className="py-2.5">Role</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252D43]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#10192B]">
                    <td className="py-3 font-semibold text-white">{u.name}</td>
                    <td className="py-3 text-slate-300 font-mono text-[11px]">{u.email}</td>
                    <td className="py-3 text-slate-400">{u.dept}</td>
                    <td className="py-3 font-medium text-[#8B5CF6]">{u.role}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#10B981]/20 text-[#10B981] font-semibold">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Access Control & RBAC Tab */}
      {activeTab === 'access' && (
        <div className="p-6 rounded-2xl bg-[#141A2D] border border-[#252D43] max-w-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2">Role-Based Access Control (RBAC) & Boundaries</h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43] flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Company Policy Editing Rights</p>
                <p className="text-[11px] text-[#94A3B8]">Only Compliance Officers and Super Admins can publish new versions</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">Enforced</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43] flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">PostgreSQL Read-Only Analytics Execution</p>
                <p className="text-[11px] text-[#94A3B8]">Blocks destructive DDL/DML queries; safe analytics execution only</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">Protected</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43] flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Multi-Tenant Data Isolation</p>
                <p className="text-[11px] text-[#94A3B8]">Strict workspace-level ChromaDB vector store separation</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">Active</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Model Configuration Tab */}
      {activeTab === 'ai' && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#141A2D] border border-[#252D43] max-w-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2">Google Gemini API Configuration</h3>
          <div>
            <label className="block text-[#94A3B8] font-medium mb-1">Production LLM Model</label>
            <select
              value={modelChoice}
              onChange={(e) => setModelChoice(e.target.value)}
              className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended Standard)</option>
            </select>
            <p className="text-[10px] text-slate-500 mt-1">High-throughput model supporting document summarization, RAG synthesis, and voice responses.</p>
          </div>
          <div>
            <label className="block text-[#94A3B8] font-medium mb-1">Reasoning Thinking Level</label>
            <select
              value={thinkingLevel}
              onChange={(e) => setThinkingLevel(e.target.value)}
              className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="MEDIUM">ThinkingLevel.MEDIUM (Balanced reasoning & speed)</option>
              <option value="LOW">ThinkingLevel.LOW (Lowest latency)</option>
              <option value="HIGH">ThinkingLevel.HIGH (Maximum reasoning depth)</option>
            </select>
          </div>
          <div>
            <label className="block text-[#94A3B8] font-medium mb-1">Vector Semantic Match Threshold (Cosine Distance)</label>
            <input
              type="text"
              value={semanticThreshold}
              onChange={(e) => setSemanticThreshold(e.target.value)}
              className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>
          <div className="pt-3 border-t border-[#252D43] flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply AI Model Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Voice & Speech Settings Tab */}
      {activeTab === 'voice' && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#141A2D] border border-[#252D43] max-w-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2">Voice AI Engine Preferences</h3>
          <div>
            <label className="block text-[#94A3B8] font-medium mb-1">Default Speech Recognition & Synthesis Language</label>
            <select
              value={voiceLang}
              onChange={(e) => setVoiceLang(e.target.value)}
              className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="en">English (US) - en-US</option>
              <option value="te">Telugu - te-IN (తెలుగు)</option>
              <option value="hi">Hindi - hi-IN (हिन्दी)</option>
            </select>
          </div>
          <div className="p-3.5 rounded-xl bg-[#080B18] border border-[#252D43] flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Auto-speak Spoken Responses</p>
              <p className="text-[11px] text-[#94A3B8]">Automatically speak the AI grounded response when asked via microphone</p>
            </div>
            <input
              type="checkbox"
              checked={autoSpeak}
              onChange={(e) => setAutoSpeak(e.target.checked)}
              className="accent-[#8B5CF6] w-4 h-4 cursor-pointer"
            />
          </div>
          <div className="pt-3 border-t border-[#252D43] flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Voice Preferences</span>
            </button>
          </div>
        </form>
      )}

      {/* Security & Audit Logs Tab */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-2xl bg-[#141A2D] border border-[#252D43] space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Enterprise Security & Compliance Audit Trail</h3>
              <p className="text-xs text-[#94A3B8]">Immutable access logs for policy queries and data extractions</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
              SOC2 Type II Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-[#252D43] text-[#94A3B8]">
                <tr>
                  <th className="py-2.5">User</th>
                  <th className="py-2.5">Event Action</th>
                  <th className="py-2.5">Timestamp</th>
                  <th className="py-2.5">IP Address</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252D43]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#10192B]">
                    <td className="py-2.5 font-semibold text-white">{log.user}</td>
                    <td className="py-2.5 text-slate-300">{log.action}</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">{log.time}</td>
                    <td className="py-2.5 font-mono text-[11px] text-slate-400">{log.ip}</td>
                    <td className="py-2.5">
                      <span className="text-[10px] font-bold text-[#10B981]">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
