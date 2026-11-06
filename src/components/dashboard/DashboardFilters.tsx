import React from 'react';
import { Calendar, MapPin, Package, RotateCcw, Filter } from 'lucide-react';
import { DashboardFilterState } from '../../types';

interface DashboardFiltersProps {
  filters: DashboardFilterState;
  onFilterChange: (filters: Partial<DashboardFilterState>) => void;
  onResetFilters: () => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const isFiltered = filters.dateRange !== 'last30' || filters.region !== 'all' || filters.product !== 'all';

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#141A2D] border border-[#252D43] select-none">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] mr-1">
          <Filter className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Filters:</span>
        </div>

        {/* 1. Date Range Filter */}
        <div className="relative flex items-center">
          <Calendar className="w-3.5 h-3.5 text-[#3B82F6] absolute left-2.5 pointer-events-none" />
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange({ dateRange: e.target.value as any })}
            className="pl-8 pr-7 py-1.5 rounded-xl bg-[#080B18] border border-[#252D43] text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors appearance-none cursor-pointer"
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days (Current)</option>
            <option value="q3">Q3 2026 Fiscal</option>
            <option value="ytd">Year-to-Date (2026)</option>
            <option value="custom">Custom Date Range...</option>
          </select>
        </div>

        {/* 2. Region Filter */}
        <div className="relative flex items-center">
          <MapPin className="w-3.5 h-3.5 text-[#22D3EE] absolute left-2.5 pointer-events-none" />
          <select
            value={filters.region}
            onChange={(e) => onFilterChange({ region: e.target.value as any })}
            className="pl-8 pr-7 py-1.5 rounded-xl bg-[#080B18] border border-[#252D43] text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Global Regions</option>
            <option value="na">North America</option>
            <option value="emea">EMEA (Europe, Middle East)</option>
            <option value="apac">APAC (Asia-Pacific)</option>
            <option value="latam">Latin America</option>
          </select>
        </div>

        {/* 3. Product Filter */}
        <div className="relative flex items-center">
          <Package className="w-3.5 h-3.5 text-[#8B5CF6] absolute left-2.5 pointer-events-none" />
          <select
            value={filters.product}
            onChange={(e) => onFilterChange({ product: e.target.value as any })}
            className="pl-8 pr-7 py-1.5 rounded-xl bg-[#080B18] border border-[#252D43] text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Product Portfolios</option>
            <option value="enterprise">Enterprise AI Suite Pro</option>
            <option value="cloud">CloudSecure Infrastructure</option>
            <option value="ai">DataVortex Intelligence</option>
            <option value="hardware">QuantumEdge Gateways</option>
          </select>
        </div>

        {/* Clear Filters */}
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#252D43]/60 hover:bg-[#252D43] text-xs text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-[#94A3B8]" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Demonstration tag */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-amber-400/90 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-md font-medium">
          Demonstration Dataset: NexaCorp Global Operations
        </span>
      </div>
    </div>
  );
};
