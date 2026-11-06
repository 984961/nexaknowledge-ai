import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DashboardFilterState } from '../../types';

interface KPICardsProps {
  filters: DashboardFilterState;
}

export const KPICards: React.FC<KPICardsProps> = ({ filters }) => {
  // Dynamic scaling based on selected filter
  let multiplier = 1;
  if (filters.region === 'na') multiplier = 0.52;
  else if (filters.region === 'emea') multiplier = 0.28;
  else if (filters.region === 'apac') multiplier = 0.16;
  else if (filters.region === 'latam') multiplier = 0.04;

  if (filters.product === 'enterprise') multiplier *= 0.41;
  else if (filters.product === 'cloud') multiplier *= 0.24;
  else if (filters.product === 'ai') multiplier *= 0.17;
  else if (filters.product === 'hardware') multiplier *= 0.07;

  if (filters.dateRange === 'last7') multiplier *= 0.23;
  else if (filters.dateRange === 'q3') multiplier *= 2.8;
  else if (filters.dateRange === 'ytd') multiplier *= 7.4;

  const revenueNum = Math.round(1420800 * multiplier);
  const ordersNum = Math.round(4820 * multiplier);
  const customersNum = Math.round(384 * (filters.region === 'all' && filters.product === 'all' ? 1 : Math.max(0.2, multiplier * 0.9)));
  const profitNum = Math.round(418500 * multiplier);

  const kpis = [
    {
      id: 'rev',
      title: 'Total Revenue',
      value: `$${revenueNum.toLocaleString()}`,
      change: '+18.2%',
      isPositive: true,
      timeframe: 'vs. previous month ($1.20M)',
      icon: DollarSign,
      gradient: 'from-[#8B5CF6]/20 via-[#3B82F6]/10 to-transparent',
      borderColor: 'border-[#8B5CF6]/30',
      iconBg: 'bg-[#8B5CF6]/20 text-[#8B5CF6]',
      glowClass: 'hover:border-[#8B5CF6]/60 hover:shadow-lg hover:shadow-[#8B5CF6]/10',
    },
    {
      id: 'ord',
      title: 'Total Orders',
      value: ordersNum.toLocaleString(),
      change: '+12.5%',
      isPositive: true,
      timeframe: 'vs. previous month (4,284)',
      icon: ShoppingCart,
      gradient: 'from-[#3B82F6]/20 via-[#22D3EE]/10 to-transparent',
      borderColor: 'border-[#3B82F6]/30',
      iconBg: 'bg-[#3B82F6]/20 text-[#3B82F6]',
      glowClass: 'hover:border-[#3B82F6]/60 hover:shadow-lg hover:shadow-[#3B82F6]/10',
    },
    {
      id: 'cust',
      title: 'Total Customers',
      value: `${customersNum.toLocaleString()} Orgs`,
      change: '+21.4%',
      isPositive: true,
      timeframe: 'Net Retention Rate 128%',
      icon: Users,
      gradient: 'from-[#22D3EE]/20 via-[#10B981]/10 to-transparent',
      borderColor: 'border-[#22D3EE]/30',
      iconBg: 'bg-[#22D3EE]/20 text-[#22D3EE]',
      glowClass: 'hover:border-[#22D3EE]/60 hover:shadow-lg hover:shadow-[#22D3EE]/10',
    },
    {
      id: 'prof',
      title: 'Net Profit',
      value: `$${profitNum.toLocaleString()}`,
      change: '+22.4%',
      isPositive: true,
      timeframe: 'Gross margin: 74.5%',
      icon: TrendingUp,
      gradient: 'from-[#10B981]/20 via-[#3B82F6]/10 to-transparent',
      borderColor: 'border-[#10B981]/30',
      iconBg: 'bg-[#10B981]/20 text-[#10B981]',
      glowClass: 'hover:border-[#10B981]/60 hover:shadow-lg hover:shadow-[#10B981]/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`p-4 rounded-2xl bg-[#141A2D] border ${kpi.borderColor} ${kpi.glowClass} bg-gradient-to-br ${kpi.gradient} transition-all duration-300 relative overflow-hidden group select-none`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#94A3B8] tracking-wide">
                {kpi.title}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${kpi.iconBg} transition-transform group-hover:scale-110`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Metric Value */}
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {kpi.value}
              </h3>
            </div>

            {/* Trend & Comparison */}
            <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-[#252D43]/60">
              <div className="flex items-center gap-1 font-semibold text-[#10B981]">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{kpi.change}</span>
              </div>
              <span className="text-[11px] text-[#94A3B8] truncate">
                {kpi.timeframe}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
