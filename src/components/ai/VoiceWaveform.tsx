import React from 'react';

interface VoiceWaveformProps {
  isListening: boolean;
  isSpeaking: boolean;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isListening, isSpeaking }) => {
  const isActive = isListening || isSpeaking;
  const barColor = isListening ? 'bg-[#22D3EE]' : isSpeaking ? 'bg-[#8B5CF6]' : 'bg-[#374151]';

  return (
    <div className="flex items-center justify-center gap-1 h-7 px-3 bg-[#080B18]/60 rounded-full border border-[#252D43]">
      <div 
        className={`w-1 rounded-full transition-all duration-300 ${barColor} ${isActive ? 'h-4 animate-waveform' : 'h-1.5'}`} 
        style={{ animationDelay: '0ms' }}
      />
      <div 
        className={`w-1 rounded-full transition-all duration-300 ${barColor} ${isActive ? 'h-6 animate-waveform' : 'h-2'}`} 
        style={{ animationDelay: '150ms' }}
      />
      <div 
        className={`w-1 rounded-full transition-all duration-300 ${barColor} ${isActive ? 'h-3 animate-waveform' : 'h-1'}`} 
        style={{ animationDelay: '300ms' }}
      />
      <div 
        className={`w-1 rounded-full transition-all duration-300 ${barColor} ${isActive ? 'h-5 animate-waveform' : 'h-2.5'}`} 
        style={{ animationDelay: '450ms' }}
      />
      <div 
        className={`w-1 rounded-full transition-all duration-300 ${barColor} ${isActive ? 'h-4 animate-waveform' : 'h-1.5'}`} 
        style={{ animationDelay: '200ms' }}
      />
      <span className="text-[10px] font-medium tracking-wider uppercase ml-1.5 text-[#94A3B8]">
        {isListening ? 'Listening' : isSpeaking ? 'Speaking' : 'Voice Ready'}
      </span>
    </div>
  );
};
