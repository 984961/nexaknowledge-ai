import React, { useState } from 'react';
import { 
  ChartNoAxesCombined, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package, 
  Megaphone, 
  ArrowUpRight, 
  Sparkles, 
  Download,
  Filter,
  BarChart3,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  REVENUE_TRENDS_DATA, 
  PRODUCT_PERFORMANCE_DATA, 
  CUSTOMER_ANALYTICS_DATA, 
  INVENTORY_ANALYTICS_DATA 
} from '../data/mockData';

interface AnalyticsPageProps {
  onAskAI: (query: string) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onAskAI }) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'finance' | 'customers' | 'inventory' | 'marketing'>('sales');

  const tabs = [
    { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'finance', label: 'Financial Analytics', icon: DollarSign },
    { id: 'customers', label: 'Customer Cohorts', icon: Users },
    { id: 'inventory', label: 'Inventory & Stock', icon: Package },
    { id: 'marketing', label: 'Marketing & ROI', icon: Megaphone },
  ];

  const marketingCampaigns = [
    { campaign: 'Q3 Enterprise AI Summit', spend: '$45,000', leads: 480, conversions: 42, cac: '$1,071', roi: '340%' },
    { campaign: 'Google Search & Cloud Ads', spend: '$32,000', leads: 920, conversions: 38, cac: '$842', roi: '280%' },
    { campaign: 'Gartner Industry Whitepaper', spend: '$25,000', leads: 310, conversions: 24, cac: '$1,041', roi: '410%' },
    { campaign: 'Webinar Series: Zero Trust RAG', spend: '$12,000', leads: 640, conversions: 29, cac: '$413', roi: '520%' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#141A2D] via-[#10192B] to-[#0B1020] border border-[#252D43]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
              Verified Business Intelligence
            </span>
            <span className="text-xs text-[#94A3B8]">• PostgreSQL & Ledger Validated</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Deep Business Analytics & Quantitative Engine
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
            Detailed performance breakdown across sales funnels, financial margins, customer retention cohorts, and supply-chain logistics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onAskAI(`Analyze our ${activeTab} metrics and generate a high-level briefing`)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI {tabs.find(t => t.id === activeTab)?.label} Breakdown</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-[#252D43]">
        {tabs.map((tab) => {
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

      {/* Content depending on activeTab */}
      {activeTab === 'sales' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8] font-medium">Enterprise Average Deal Size</span>
              <p className="text-2xl font-extrabold text-white mt-1">$48,200</p>
              <span className="text-[11px] text-[#10B981] font-semibold mt-1 block">+14.2% vs Q2</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8] font-medium">Sales Cycle Duration</span>
              <p className="text-2xl font-extrabold text-white mt-1">34 Days</p>
              <span className="text-[11px] text-[#22D3EE] font-semibold mt-1 block">Accelerated from 48 days</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8] font-medium">Win Rate Against Competitors</span>
              <p className="text-2xl font-extrabold text-white mt-1">68.4%</p>
              <span className="text-[11px] text-[#10B981] font-semibold mt-1 block">Top win factor: RAG security</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43]">
            <h3 className="text-sm font-bold text-white mb-1">Product Sales Volume & Margin Contribution</h3>
            <p className="text-xs text-[#94A3B8] mb-4">Total revenue recognized per licensed product line</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PRODUCT_PERFORMANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252D43" vertical={false} />
                  <XAxis dataKey="product" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#141A2D', borderColor: '#252D43' }} />
                  <Bar dataKey="revenue" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Gross Profit Margin</span>
              <p className="text-2xl font-extrabold text-white mt-1">74.5%</p>
              <span className="text-[11px] text-[#10B981] font-semibold">+2.1% expansion</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">EBITDA Margin</span>
              <p className="text-2xl font-extrabold text-white mt-1">29.4%</p>
              <span className="text-[11px] text-[#10B981] font-semibold">$418.5k Operating profit</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Operating Runway</span>
              <p className="text-2xl font-extrabold text-white mt-1">28 Months</p>
              <span className="text-[11px] text-slate-400">Cash reserve: $8.4M</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Cloud Infrastructure Cost</span>
              <p className="text-2xl font-extrabold text-white mt-1">$42,300/mo</p>
              <span className="text-[11px] text-[#22D3EE]">Scale-to-zero optimized</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43]">
            <h3 className="text-sm font-bold text-white mb-1">Fiscal Trajectory: Revenue vs OPEX</h3>
            <p className="text-xs text-[#94A3B8] mb-4">Historical expenses and revenue trajectory</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_TRENDS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252D43" vertical={false} />
                  <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#141A2D', borderColor: '#252D43' }} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Total Revenue" />
                  <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="#EF4444" fillOpacity={0.15} name="Operating Expenses" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Net Revenue Retention (NRR)</span>
              <p className="text-2xl font-extrabold text-white mt-1">128%</p>
              <span className="text-[11px] text-[#10B981] font-semibold">Healthy expansion tier</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Enterprise Logo Churn</span>
              <p className="text-2xl font-extrabold text-white mt-1">1.0%</p>
              <span className="text-[11px] text-[#10B981] font-semibold">Down from 1.4% in June</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Customer Lifetime Value (LTV)</span>
              <p className="text-2xl font-extrabold text-white mt-1">$142,000</p>
              <span className="text-[11px] text-[#22D3EE] font-semibold">LTV:CAC ratio 5.2x</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43]">
            <h3 className="text-sm font-bold text-white mb-1">Customer Cohort Acquisition Progression</h3>
            <p className="text-xs text-[#94A3B8] mb-4">New enterprise clients vs existing client base</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CUSTOMER_ANALYTICS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252D43" vertical={false} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#141A2D', borderColor: '#252D43' }} />
                  <Legend />
                  <Bar dataKey="returningCustomers" fill="#3B82F6" name="Active Returning Base" stackId="x" />
                  <Bar dataKey="newCustomers" fill="#22D3EE" name="Newly Onboarded" stackId="x" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Total Catalogued SKUs</span>
              <p className="text-2xl font-extrabold text-white mt-1">1,240</p>
              <span className="text-[11px] text-slate-400">Software & hardware items</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-amber-500/30">
              <span className="text-xs text-amber-400">Stock Reorder Triggers</span>
              <p className="text-2xl font-extrabold text-white mt-1">2 Hardware Models</p>
              <span className="text-[11px] text-amber-300">Below minimum buffer</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-red-500/30">
              <span className="text-xs text-red-400">Out-of-Stock SKUs</span>
              <p className="text-2xl font-extrabold text-white mt-1">1 Item</p>
              <span className="text-[11px] text-red-300">Rackmount Inference Server R1</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] overflow-x-auto">
            <h3 className="text-sm font-bold text-white mb-1">Hardware & License Warehouse Inventory Ledger</h3>
            <p className="text-xs text-[#94A3B8] mb-4">Stock level vs reorder thresholds</p>
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#252D43] text-[#94A3B8]">
                <tr>
                  <th className="py-2">SKU</th>
                  <th className="py-2">Product Name</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Available Stock</th>
                  <th className="py-2">Reorder Point</th>
                  <th className="py-2">Turnover Rate</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252D43]">
                {INVENTORY_ANALYTICS_DATA.map((item) => (
                  <tr key={item.sku} className="hover:bg-[#10192B]">
                    <td className="py-2.5 font-mono text-[#8B5CF6]">{item.sku}</td>
                    <td className="py-2.5 font-medium text-white">{item.productName}</td>
                    <td className="py-2.5 text-slate-400">{item.category}</td>
                    <td className="py-2.5 font-bold text-white">{item.inStock}</td>
                    <td className="py-2.5 text-slate-400">{item.reorderPoint}</td>
                    <td className="py-2.5 text-slate-400">{item.turnoverRate}x</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Out of Stock' ? 'bg-red-500/20 text-red-400' :
                        item.status === 'Low Stock' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-[#10B981]/20 text-[#10B981]'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'marketing' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Total Marketing Spend (Q3)</span>
              <p className="text-2xl font-extrabold text-white mt-1">$114,000</p>
              <span className="text-[11px] text-slate-400">Within 8% of forecast</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Qualified Leads (MQL)</span>
              <p className="text-2xl font-extrabold text-white mt-1">2,350</p>
              <span className="text-[11px] text-[#10B981] font-semibold">+28% YoY</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Blended CAC</span>
              <p className="text-2xl font-extrabold text-white mt-1">$857</p>
              <span className="text-[11px] text-[#10B981] font-semibold">-12% acquisition cost</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141A2D] border border-[#252D43]">
              <span className="text-xs text-[#94A3B8]">Blended Campaign ROI</span>
              <p className="text-2xl font-extrabold text-white mt-1">368%</p>
              <span className="text-[11px] text-[#22D3EE] font-semibold">High inbound conversion</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] overflow-x-auto">
            <h3 className="text-sm font-bold text-white mb-1">Active Enterprise Growth Campaigns</h3>
            <p className="text-xs text-[#94A3B8] mb-4">Performance attribution across event, digital, and content channels</p>
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#252D43] text-[#94A3B8]">
                <tr>
                  <th className="py-2">Campaign Name</th>
                  <th className="py-2">Total Spend</th>
                  <th className="py-2">Leads Generated</th>
                  <th className="py-2">Closed Deals</th>
                  <th className="py-2">CAC</th>
                  <th className="py-2">ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252D43]">
                {marketingCampaigns.map((c) => (
                  <tr key={c.campaign} className="hover:bg-[#10192B]">
                    <td className="py-2.5 font-medium text-white">{c.campaign}</td>
                    <td className="py-2.5 text-slate-300">{c.spend}</td>
                    <td className="py-2.5 text-slate-300">{c.leads}</td>
                    <td className="py-2.5 font-bold text-white">{c.conversions}</td>
                    <td className="py-2.5 text-slate-300">{c.cac}</td>
                    <td className="py-2.5 font-bold text-[#10B981]">{c.roi}</td>
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
