import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  PieChart as PieIcon, 
  BarChart3, 
  Users, 
  Package, 
  AlertCircle, 
  Download,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  REVENUE_TRENDS_DATA, 
  CATEGORY_SALES_DATA, 
  PRODUCT_PERFORMANCE_DATA, 
  CUSTOMER_ANALYTICS_DATA, 
  INVENTORY_ANALYTICS_DATA 
} from '../../data/mockData';
import { DashboardFilterState } from '../../types';

interface BusinessChartsProps {
  filters: DashboardFilterState;
  isEditMode?: boolean;
}

export const BusinessCharts: React.FC<BusinessChartsProps> = ({ filters, isEditMode }) => {
  const [revenueGranularity, setRevenueGranularity] = useState<'monthly' | 'weekly'>('monthly');

  // Filter-adjusted revenue data
  let scale = 1;
  if (filters.region === 'na') scale = 0.52;
  else if (filters.region === 'emea') scale = 0.28;
  else if (filters.region === 'apac') scale = 0.16;
  else if (filters.region === 'latam') scale = 0.04;

  const adjustedRevenue = REVENUE_TRENDS_DATA.map(d => ({
    ...d,
    revenue: Math.round(d.revenue * scale),
    expenses: Math.round(d.expenses * scale),
    target: Math.round(d.target * scale),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#141A2D] border border-[#252D43] p-2.5 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-white mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[#94A3B8]">{entry.name}:</span>
              <span className="font-semibold text-white">
                {typeof entry.value === 'number' && entry.value > 1000 ? `$${entry.value.toLocaleString()}` : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Row 1: Revenue Trends & Sales by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart 1: Revenue Trends (2 cols on lg) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Revenue & Expenses Trajectory</h3>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Monthly revenue compared to expense ceiling and forecasted enterprise target
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#080B18] p-1 rounded-xl border border-[#252D43]">
              <button
                onClick={() => setRevenueGranularity('monthly')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  revenueGranularity === 'monthly' ? 'bg-[#8B5CF6] text-white' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setRevenueGranularity('weekly')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  revenueGranularity === 'weekly' ? 'bg-[#8B5CF6] text-white' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adjustedRevenue}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#252D43" vertical={false} />
                <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
                <Line type="monotone" dataKey="target" name="Target" stroke="#22D3EE" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Sales by Category (Donut Chart) */}
        <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                <PieIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Sales by Category</h3>
            </div>
            <p className="text-xs text-[#94A3B8]">Portfolio contribution percentage</p>
          </div>

          <div className="h-52 w-full my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_SALES_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_SALES_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Category Legend */}
          <div className="space-y-1 pt-2 border-t border-[#252D43] text-xs">
            {CATEGORY_SALES_DATA.slice(0, 3).map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-[#94A3B8] truncate">{cat.name}</span>
                </div>
                <span className="font-semibold text-white ml-2">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Product Performance, Customer Analytics, Inventory Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Chart 3: Product Performance (Bar Chart) */}
        <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE]">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Top Products by Revenue</h3>
            </div>
            <p className="text-xs text-[#94A3B8]">Revenue & units sold</p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCT_PERFORMANCE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#252D43" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#94A3B8"
                  fontSize={10}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="product"
                  stroke="#94A3B8"
                  fontSize={10}
                  width={110}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" name="Revenue" fill="#8B5CF6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-[#94A3B8] flex justify-between pt-2 border-t border-[#252D43]">
            <span>Leading: NexaAI Suite Pro ($580k)</span>
            <span className="text-[#10B981] font-semibold">78% Avg Margin</span>
          </div>
        </div>

        {/* Chart 4: Customer Analytics (Cohort Line) */}
        <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Customer Acquisition & Retention</h3>
            </div>
            <p className="text-xs text-[#94A3B8]">New vs. Returning Enterprise Clients</p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CUSTOMER_ANALYTICS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252D43" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="returningCustomers" name="Returning" stackId="a" fill="#3B82F6" />
                <Bar dataKey="newCustomers" name="New Acquired" stackId="a" fill="#22D3EE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-[#94A3B8] flex justify-between pt-2 border-t border-[#252D43]">
            <span>October Churn Rate: 1.0%</span>
            <span className="text-[#22D3EE] font-semibold">+68 New Accounts</span>
          </div>
        </div>

        {/* Chart 5: Inventory Analysis & Alerts */}
        <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Inventory Stock Status</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                2 Low Stock
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">Stock availability vs reorder threshold</p>
          </div>

          {/* Inventory list bars */}
          <div className="my-2 space-y-2.5">
            {INVENTORY_ANALYTICS_DATA.slice(0, 4).map((item) => {
              const percentage = Math.min(100, Math.round((item.inStock / (item.reorderPoint * 2 || 1)) * 100));
              return (
                <div key={item.sku} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium truncate max-w-[170px]">
                      {item.productName}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.status === 'Out of Stock' 
                        ? 'bg-red-500/20 text-red-400' 
                        : item.status === 'Low Stock' 
                        ? 'bg-amber-500/20 text-amber-300' 
                        : 'bg-[#10B981]/20 text-[#10B981]'
                    }`}>
                      {item.inStock} left ({item.status})
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#080B18] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.status === 'Out of Stock'
                          ? 'bg-red-500 w-0'
                          : item.status === 'Low Stock'
                          ? 'bg-amber-400'
                          : 'bg-[#10B981]'
                      }`}
                      style={{ width: `${item.status === 'Out of Stock' ? 4 : percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-[#94A3B8] flex justify-between pt-2 border-t border-[#252D43]">
            <span>Fulfillment Warehouses: 4 Active</span>
            <span className="text-amber-400 font-semibold">1 Stockout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
