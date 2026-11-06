import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Paperclip, 
  ChevronRight, 
  ChevronLeft, 
  Globe, 
  FileText, 
  ExternalLink,
  Info,
  Maximize2,
  Minimize2,
  ArrowUpRight
} from 'lucide-react';
import { ChatMessage, QueryRoute, PolicyCitation } from '../../types';
import { processAIQuery } from '../../services/aiService';
import { voiceService, SupportedLanguage } from '../../services/voiceService';
import { VoiceWaveform } from './VoiceWaveform';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigateToPolicy?: (policyName: string) => void;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'ai',
    text: `Hello Mohan! I am **NexaKnowledge AI**, your unified enterprise knowledge and business intelligence assistant.

I can help you:
• Answer questions from **Company Policies** with verifiable citations
• Analyze real-time **Business Analytics, Revenue & Inventory**
• Conduct semantic search across all **Uploaded Documents**
• Generate dynamic **Dashboards and Reports**
• Speak or listen in **English, Telugu, and Hindi**`,
    timestamp: 'Just now',
    route: 'Company Policy RAG',
  }
];

const SUGGESTED_QUESTIONS = [
  'Explain my company leave policy',
  'Show my revenue trends',
  'Find my top-selling products',
  'Which products have low stock?',
  'What is the work-from-home policy?',
  'Compare travel policy with actual expenses',
  'Summarize my HR policies',
  'Generate a business dashboard',
  'Create a monthly business report'
];

export const AIAssistant: React.FC<AIAssistantProps> = ({
  isOpen,
  onToggle,
  onNavigateToPolicy,
  initialQuery,
  onClearInitialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Voice state
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, speechTranscript]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
      onClearInitialQuery?.();
    }
  }, [initialQuery]);

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakResponse = (text: string) => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    voiceService.speak(
      text,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleStopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  };

  const toggleListening = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      if (speechTranscript.trim()) {
        handleSendMessage(speechTranscript.trim());
        setSpeechTranscript('');
      }
      return;
    }

    setVoiceError(null);
    setSpeechTranscript('');
    voiceService.startListening({
      language,
      onStart: () => setIsListening(true),
      onTranscript: (transcript, isFinal) => {
        setSpeechTranscript(transcript);
        if (isFinal) {
          setIsListening(false);
          handleSendMessage(transcript);
          setSpeechTranscript('');
        }
      },
      onError: (err) => {
        setIsListening(false);
        setVoiceError(err);
        setTimeout(() => setVoiceError(null), 4000);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    setInputText('');
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await processAIQuery(query);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        route: response.route,
        citations: response.citations,
        chartData: response.chartData,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Automatically speak short confirmation or answer if user asked via voice
      if (isListening) {
        handleSpeakResponse(response.text);
      }
    } catch (error: any) {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'I encountered an issue retrieving the response. Please retry your query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
    setMessages(INITIAL_MESSAGES);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-4 bottom-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white shadow-2xl hover:scale-105 transition-all glow-purple font-semibold text-xs"
      >
        <Bot className="w-5 h-5 text-white animate-pulse" />
        <span>Nexa AI Assistant</span>
        <span className="w-2 h-2 rounded-full bg-[#10B981] ring-2 ring-[#0B1020]" />
      </button>
    );
  }

  return (
    <aside className="w-[360px] xl:w-[380px] shrink-0 h-screen bg-[#0B1020] border-l border-[#252D43] flex flex-col z-30 shadow-2xl select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-[#252D43] bg-[#0B1020] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-white shadow-md">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-white tracking-tight">Nexa AI Assistant</h2>
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            </div>
            <p className="text-[10px] text-[#94A3B8]">Connected • Gemini 3.8 Flash</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* New Conversation */}
          <button
            onClick={handleClearChat}
            title="New Conversation"
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#141A2D] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Language selector */}
          <div className="relative group">
            <button
              title="Voice Language"
              className="px-1.5 py-1 rounded-lg text-[10px] font-semibold text-[#8B5CF6] bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/30 flex items-center gap-1 uppercase"
            >
              <Globe className="w-3 h-3" />
              <span>{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 bg-[#141A2D] border border-[#252D43] rounded-xl shadow-xl p-1 hidden group-hover:block z-50 min-w-[100px]">
              <button
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-2 py-1 text-[11px] rounded ${language === 'en' ? 'text-[#8B5CF6] font-bold bg-[#8B5CF6]/10' : 'text-[#94A3B8] hover:text-white'}`}
              >
                English (US)
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`w-full text-left px-2 py-1 text-[11px] rounded ${language === 'te' ? 'text-[#8B5CF6] font-bold bg-[#8B5CF6]/10' : 'text-[#94A3B8] hover:text-white'}`}
              >
                Telugu (తెలుగు)
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`w-full text-left px-2 py-1 text-[11px] rounded ${language === 'hi' ? 'text-[#8B5CF6] font-bold bg-[#8B5CF6]/10' : 'text-[#94A3B8] hover:text-white'}`}
              >
                Hindi (हिन्दी)
              </button>
            </div>
          </div>

          {/* Close / Collapse button */}
          <button
            onClick={onToggle}
            title="Collapse Assistant"
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#141A2D] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voice Status Bar */}
      <div className="px-3.5 py-2 bg-[#080B18]/80 border-b border-[#252D43] flex items-center justify-between text-xs">
        <VoiceWaveform isListening={isListening} isSpeaking={isSpeaking} />
        {isSpeaking ? (
          <button
            onClick={handleStopSpeaking}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#8B5CF6] hover:text-white bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/30 px-2 py-0.5 rounded-md"
          >
            <VolumeX className="w-3 h-3" />
            <span>Stop Audio</span>
          </button>
        ) : (
          <span className="text-[10px] text-[#94A3B8]">STT & TTS Active</span>
        )}
      </div>

      {/* Voice error notice */}
      {voiceError && (
        <div className="mx-3 mt-2 p-2 rounded-lg bg-red-950/50 border border-red-500/40 text-[11px] text-red-200">
          {voiceError}
        </div>
      )}

      {/* Real-time live transcript banner */}
      {isListening && speechTranscript && (
        <div className="mx-3 mt-2 p-2.5 rounded-xl bg-[#141A2D] border border-[#22D3EE]/40 text-xs text-[#22D3EE] animate-pulse">
          <span className="font-semibold text-white">Transcribing: </span>
          {speechTranscript}
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[92%] rounded-2xl p-3 text-xs leading-relaxed ${
                  isAI
                    ? 'bg-[#141A2D] text-slate-100 border border-[#252D43] shadow-md'
                    : 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-lg'
                }`}
              >
                {/* AI Query Route Badge */}
                {isAI && msg.route && (
                  <div className="mb-2 pb-1.5 border-b border-[#252D43] flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                      [Route: {msg.route}]
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <button
                        onClick={() => handleSpeakResponse(msg.text)}
                        title="Speak response aloud"
                        className="hover:text-white"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        title="Copy message"
                        className="hover:text-white"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Text Content */}
                <div className="whitespace-pre-wrap space-y-1">
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) {
                      return <p key={idx} className="pl-1 text-slate-200">{line}</p>;
                    }
                    return <p key={idx}>{line}</p>;
                  })}
                </div>

                {/* Embedded Charts if requested */}
                {msg.chartData && (
                  <div className="mt-3 p-2.5 bg-[#080B18] rounded-xl border border-[#252D43]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                      {msg.chartData.title}
                    </p>
                    <div className="h-32 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {msg.chartData.type === 'bar' ? (
                          <BarChart data={msg.chartData.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#252D43" />
                            <XAxis dataKey="product" stroke="#94A3B8" fontSize={9} tickLine={false} />
                            <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#141A2D', borderColor: '#252D43', fontSize: '10px' }}
                            />
                            <Bar dataKey={msg.chartData.dataKey || 'revenue'} fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        ) : (
                          <LineChart data={msg.chartData.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#252D43" />
                            <XAxis dataKey="period" stroke="#94A3B8" fontSize={9} tickLine={false} />
                            <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#141A2D', borderColor: '#252D43', fontSize: '10px' }}
                            />
                            <Line type="monotone" dataKey={msg.chartData.dataKey || 'revenue'} stroke="#22D3EE" strokeWidth={2} dot={{ r: 2 }} />
                          </LineChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Grounded Policy Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#252D43] space-y-2">
                    <p className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Grounded Policy Citations ({msg.citations.length})
                    </p>
                    {msg.citations.map((cite, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2 rounded-lg bg-[#080B18]/90 border border-[#252D43] text-[10px] space-y-1"
                      >
                        <div className="flex items-center justify-between font-semibold text-white">
                          <span className="truncate">{cite.policyName} ({cite.version})</span>
                          <span className="text-[#3B82F6] shrink-0 ml-1">Page {cite.page}</span>
                        </div>
                        <p className="text-slate-400 font-medium">{cite.section}</p>
                        <blockquote className="italic text-slate-300 border-l-2 border-[#8B5CF6] pl-1.5 py-0.5 bg-[#141A2D]/40 rounded-r">
                          "{cite.sourcePassage}"
                        </blockquote>
                        {onNavigateToPolicy && (
                          <button
                            onClick={() => onNavigateToPolicy(cite.policyName)}
                            className="text-[9px] text-[#8B5CF6] hover:underline flex items-center gap-0.5 pt-0.5"
                          >
                            <span>Open in Policy Library</span>
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <span className="text-[9px] text-slate-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#141A2D] border border-[#252D43] max-w-[80%] text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-[#8B5CF6] animate-spin" />
            <span>Analyzing enterprise knowledge & data...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-3 py-2 border-t border-[#252D43] bg-[#0B1020]">
        <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">
          Suggested Inquiries
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[10px] px-2.5 py-1 rounded-full bg-[#141A2D] hover:bg-[#8B5CF6]/20 border border-[#252D43] hover:border-[#8B5CF6]/40 text-slate-300 hover:text-white shrink-0 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Message Composer & Voice Control */}
      <div className="p-3 border-t border-[#252D43] bg-[#0B1020]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5 bg-[#141A2D] rounded-xl border border-[#252D43] p-1.5 focus-within:border-[#8B5CF6] transition-all"
        >
          {/* File Attachment simulation */}
          <button
            type="button"
            onClick={() => alert('Document attachment uploaded to temporary session context.')}
            title="Attach Document"
            className="p-1.5 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#080B18] transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Microphone Button */}
          <button
            type="button"
            onClick={toggleListening}
            title={isListening ? 'Stop Speaking' : 'Speak Question (Speech-to-Text)'}
            className={`p-1.5 rounded-lg transition-all ${
              isListening
                ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                : 'text-[#22D3EE] hover:bg-[#22D3EE]/15'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? 'Listening to voice...' : 'Ask policy, analytics, or doc query...'}
            className="flex-1 bg-transparent text-xs text-white placeholder-[#94A3B8] focus:outline-none px-1"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] disabled:opacity-40 text-white rounded-lg transition-all shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
};
