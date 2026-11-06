export type SupportedLanguage = 'en' | 'te' | 'hi';

export interface VoiceServiceOptions {
  language: SupportedLanguage;
  onTranscript: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onStart: () => void;
  onEnd: () => void;
}

const LANG_CODE_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  te: 'te-IN',
  hi: 'hi-IN',
};

class VoiceService {
  private recognition: any = null;
  private isListening: boolean = false;
  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition
    );
  }

  public isSpeechSynthesisSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  }

  public startListening(options: VoiceServiceOptions) {
    if (!this.isSpeechRecognitionSupported()) {
      options.onError('Browser Speech Recognition is not supported in this environment. Please type your message.');
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (this.recognition) {
        try {
          this.recognition.abort();
        } catch (e) {
          // ignore
        }
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = LANG_CODE_MAP[options.language] || 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        options.onStart();
      };

      this.recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        if (final) {
          options.onTranscript(final.trim(), true);
        } else if (interim) {
          options.onTranscript(interim.trim(), false);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        options.onError(event.error || 'Speech recognition encountered an issue.');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        options.onEnd();
      };

      this.recognition.start();
    } catch (err: any) {
      this.isListening = false;
      options.onError(err.message || 'Could not start speech recognition.');
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }

  public speak(
    text: string, 
    language: SupportedLanguage = 'en', 
    onStart?: () => void, 
    onEnd?: () => void
  ) {
    if (!this.isSpeechSynthesisSupported()) {
      return;
    }

    this.stopSpeaking();

    // Clean markdown and citations brackets before speech for clean audio
    const cleanText = text
      .replace(/\[Route[^\]]*\]/g, '')
      .replace(/Source:[^\n]+/g, '')
      .replace(/[#*`_]/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    if (!cleanText) return;

    // Split text into reasonable chunks if very long
    const summaryText = cleanText.length > 300 ? cleanText.slice(0, 300) + '...' : cleanText;

    const utterance = new SpeechSynthesisUtterance(summaryText);
    utterance.lang = LANG_CODE_MAP[language] || 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (this.isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }

  public getListeningState(): boolean {
    return this.isListening;
  }
}

export const voiceService = new VoiceService();
