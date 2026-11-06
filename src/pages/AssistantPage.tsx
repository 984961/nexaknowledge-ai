import React from 'react';
import { Bot, Sparkles, Mic, FileText, Database, TrendingUp, ShieldCheck } from 'lucide-react';

interface AssistantPageProps {
  onAskAI: (query: string) => void;
  onOpenRightAssistant: () => void;
}

export const AssistantPage: React.FC<AssistantPageProps> = ({ onAskAI, onOpenRightAssistant }) => {
  const capabilities = [
    {
      title: 'Company Policy RAG',
      desc: 'Retrieves verified HR, Leave, WFH, IT Security, and Travel policies with page numbers and exact paragraph quotations.',
      icon: ShieldCheck,
      color: 'text-[#8B5CF6]',
      bg: 'bg-[#8B5CF6]/20',
      sample: 'Explain my company leave policy and carryover rules'
    },
    {
      title: 'Business Analytics & SQL',
      desc: 'Analyzes verified revenue ledgers, customer cohort churn, product sales margins, and warehouse inventory stock.',
      icon: TrendingUp,
      color: 'text-[#3B82F6]',
      bg: 'bg-[#3B82F6]/20',
      sample: 'Show my revenue trends vs targets for Q3'
    },
    {
      title: 'Combined Intelligence',
      desc: 'Correlates policy rules with transactional data (e.g., comparing travel per diem limits with actual employee claims).',
      icon: Sparkles,
      color: 'text-[#22D3EE]',
      bg: 'bg-[#22D3EE]/20',
      sample: 'Compare our travel reimbursement policy with actual expenses'
    },
    {
      title: 'Voice-Enabled Intelligence',
      desc: 'Natural conversational voice interface powered by Web Speech APIs and Gemini AI with multilingual support (EN, TE, HI).',
      icon: Mic,
      color: 'text-[#10B981]',
      bg: 'bg-[#10B981]/20',
      sample: 'Find my top-selling products by margin'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto select-none">
      <div className="text-center max-w-2xl mx-auto py-8 space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#8B5CF6] via-[#3B82F6] to-[#22D3EE] p-[2px] mx-auto shadow-xl shadow-[#8B5CF6]/20">
          <div className="w-full h-full bg-[#0B1020] rounded-[22px] flex items-center justify-center">
            <Bot className="w-8 h-8 text-[#8B5CF6]" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          NexaKnowledge AI Assistant
        </h2>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          Your universal enterprise intelligence copilot. Ask anything about internal company policies, business analytics, contracts, and inventory.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={onOpenRightAssistant}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white font-bold text-xs shadow-lg shadow-[#8B5CF6]/30 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Interactive Assistant Panel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#141A2D] border border-[#252D43] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cap.bg} ${cap.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{cap.title}</h3>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{cap.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#252D43]">
                <button
                  onClick={() => {
                    onAskAI(cap.sample);
                    onOpenRightAssistant();
                  }}
                  className="w-full text-left text-xs text-[#8B5CF6] hover:text-white font-semibold flex items-center justify-between group-hover:translate-x-0.5 transition-all"
                >
                  <span className="truncate">Try: "{cap.sample}"</span>
                  <Sparkles className="w-3.5 h-3.5 shrink-0 ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
