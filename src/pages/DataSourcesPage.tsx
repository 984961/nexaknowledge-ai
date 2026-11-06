import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Server, 
  FileText, 
  Link2, 
  AlertCircle, 
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { DataSource } from '../types';
import { INITIAL_DATA_SOURCES } from '../data/mockData';

interface DataSourcesPageProps {
  onAskAI: (query: string) => void;
}

export const DataSourcesPage: React.FC<DataSourcesPageProps> = ({ onAskAI }) => {
  const [dataSources, setDataSources] = useState<DataSource[]>(INITIAL_DATA_SOURCES);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [inspectSource, setInspectSource] = useState<DataSource | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);

  // New connector form
  const [newConnName, setNewConnName] = useState('');
  const [newConnType, setNewConnType] = useState<DataSource['type']>('PostgreSQL');
  const [newConnHost, setNewConnHost] = useState('');

  const handleSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setDataSources(prev => prev.map(ds => {
        if (ds.id === id) {
          return { ...ds, lastSync: 'Just now', status: 'Connected' };
        }
        return ds;
      }));
      setSyncingId(null);
    }, 1500);
  };

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConnName.trim()) return;

    const newSource: DataSource = {
      id: `ds-${Date.now()}`,
      name: newConnName,
      type: newConnType,
      status: 'Connected',
      lastSync: 'Just now',
      recordsCount: 'Sync initialized',
      size: '2.5 MB',
      category: newConnType === 'PostgreSQL' || newConnType === 'MySQL' ? 'Structured Database' : 'Document Storage',
    };

    setDataSources([newSource, ...dataSources]);
    setShowConnectModal(false);
    setNewConnName('');
    setNewConnHost('');
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#141A2D] via-[#10192B] to-[#0B1020] border border-[#252D43]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/30">
              Data Integrations
            </span>
            <span className="text-xs text-[#94A3B8]">• Multi-Tenant Isolation & Zero-Trust Access</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Data Sources & Enterprise Connectors
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
            Central repository of structured relational databases, vector embedding stores, and multi-format document pipelines powering NexaKnowledge AI.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onAskAI('Check status of all connected data sources and verify last sync timestamps')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#8B5CF6] border border-[#8B5CF6]/40 text-xs font-semibold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Connection Audit</span>
          </button>
          <button
            onClick={() => setShowConnectModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Data Source</span>
          </button>
        </div>
      </div>

      {/* Grid of Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataSources.map((source) => {
          const isSyncing = syncingId === source.id;
          return (
            <div
              key={source.id}
              className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#080B18] border border-[#252D43] flex items-center justify-center text-[#8B5CF6]">
                      {source.type === 'PostgreSQL' || source.type === 'MySQL' ? (
                        <Database className="w-4 h-4 text-[#3B82F6]" />
                      ) : (
                        <FileText className="w-4 h-4 text-[#8B5CF6]" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase">
                        {source.type}
                      </span>
                      <p className="text-[11px] text-slate-400">{source.category}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      source.status === 'Connected'
                        ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {source.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                  {source.name}
                </h3>

                <div className="mt-3 p-2.5 rounded-xl bg-[#080B18] border border-[#252D43] space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-[#94A3B8]">Records / Scale:</span>
                    <span className="font-semibold text-white">{source.recordsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-[#94A3B8]">Data Footprint:</span>
                    <span className="text-slate-300">{source.size}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#252D43] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Sync: {source.lastSync}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setInspectSource(source)}
                    className="px-2 py-1 rounded-lg bg-[#080B18] hover:bg-[#10192B] border border-[#252D43] text-[11px] text-slate-300 hover:text-white"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => handleSync(source.id)}
                    disabled={isSyncing}
                    className="p-1.5 rounded-lg bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/30 text-[#8B5CF6] border border-[#8B5CF6]/30 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspect Modal */}
      {inspectSource && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#252D43]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-[#8B5CF6]" />
                {inspectSource.name}
              </h3>
              <button onClick={() => setInspectSource(null)} className="text-[#94A3B8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#080B18] border border-[#252D43] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Type:</span>
                  <span className="font-semibold text-white">{inspectSource.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Security Boundary:</span>
                  <span className="text-[#10B981] font-semibold">Row-Level Security (RLS) Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Query Execution:</span>
                  <span className="text-[#22D3EE] font-semibold">Read-Only Analytics Role</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">ChromaDB Embeddings:</span>
                  <span className="font-semibold text-white">cosine-similarity index</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setInspectSource(null)}
                className="px-4 py-1.5 rounded-xl bg-[#252D43] text-xs font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Data Source Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141A2D] border border-[#252D43] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#252D43]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#8B5CF6]" />
                Connect Data Source
              </h3>
              <button onClick={() => setShowConnectModal(false)} className="text-[#94A3B8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConnectSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Source Name</label>
                <input
                  type="text"
                  required
                  value={newConnName}
                  onChange={(e) => setNewConnName(e.target.value)}
                  placeholder="e.g. European Sales Ledger PostgreSQL"
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Connector Engine</label>
                <select
                  value={newConnType}
                  onChange={(e) => setNewConnType(e.target.value as any)}
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
                >
                  <option value="PostgreSQL">PostgreSQL Database</option>
                  <option value="MySQL">MySQL Database</option>
                  <option value="REST API">REST API Feed</option>
                  <option value="CSV">Bulk CSV Import</option>
                  <option value="XLSX">Excel Workbook</option>
                </select>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Connection Host or Endpoint</label>
                <input
                  type="text"
                  value={newConnHost}
                  onChange={(e) => setNewConnHost(e.target.value)}
                  placeholder="postgres://user:***@cloudsql.company.internal:5432/analytics"
                  className="w-full bg-[#080B18] border border-[#252D43] rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="pt-3 border-t border-[#252D43] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold"
                >
                  Save & Validate Connection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
