import React, { useState } from 'react';
import { Sparkles, Plus, Download, RefreshCw, BarChart2, ShieldCheck, Database, ArrowRight } from 'lucide-react';
import { DashboardFilterState, NavigationModule } from '../types';
import { DashboardFilters } from '../components/dashboard/DashboardFilters';
import { KPICards } from '../components/dashboard/KPICards';
import { BusinessCharts } from '../components/dashboard/BusinessCharts';

interface DashboardPageProps {
  onNavigate: (module: NavigationModule) => void;
  onAskAI: (query: string) => void;
  isEditMode: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onAskAI,
  isEditMode,
}) => {
  const [filters, setFilters] = useState<DashboardFilterState>({
    dateRange: 'last30',
    region: 'all',
    product: 'all',
  });

  const handleFilterChange = (newFilters: Partial<DashboardFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: 'last30',
      region: 'all',
      product: 'all',
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Welcome Banner / Overview Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#141A2D] via-[#10192B] to-[#0B1020] border border-[#252D43] relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
              Enterprise Dashboard
            </span>
            <span className="text-xs text-[#94A3B8]">• Live Vector & SQL Feeds</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            NexaKnowledge Intelligence Center
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl leading-relaxed">
            Real-time unified intelligence across 7 organizational policies, 18 business documents, and multi-tenant SQL telemetry.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="relative z-10 flex items-center gap-2.5">
          <button
            onClick={() => onAskAI('Analyze my business performance and summarize key financial drivers')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Executive Brief</span>
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141A2D] hover:bg-[#252D43] text-slate-300 hover:text-white border border-[#252D43] text-xs font-semibold transition-all"
          >
            <span>Create AI Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#8B5CF6]/10 to-transparent pointer-events-none" />
      </div>

      {/* 3 Interactive Dashboard Filters */}
      <DashboardFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 4 Glowing KPI Cards */}
      <KPICards filters={filters} />

      {/* 5 Interactive Business Charts */}
      <BusinessCharts filters={filters} isEditMode={isEditMode} />

      {/* Bottom Quick Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div 
          onClick={() => onNavigate('policies')}
          className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43] hover:border-[#8B5CF6]/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-sm font-bold text-white mt-3">Company Policy Intelligence</h4>
          <p className="text-xs text-[#94A3B8] mt-1">
            7 Active Policies. Compare versions, verify leave rules, travel per diems, and compliance rules.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('analytics')}
          className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43] hover:border-[#3B82F6]/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center">
              <BarChart2 className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-sm font-bold text-white mt-3">Deep Business Analytics</h4>
          <p className="text-xs text-[#94A3B8] mt-1">
            Sales cohorts, EBITDA margin breakdowns, inventory turnover, and customer acquisition metrics.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('datasources')}
          className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43] hover:border-[#22D3EE]/50 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#22D3EE]/20 text-[#22D3EE] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-sm font-bold text-white mt-3">Data Sources & Connectors</h4>
          <p className="text-xs text-[#94A3B8] mt-1">
            6 Connected streams. PostgreSQL cluster, Document vector store, and corporate file archives.
          </p>
        </div>
      </div>
    </div>
  );
};
