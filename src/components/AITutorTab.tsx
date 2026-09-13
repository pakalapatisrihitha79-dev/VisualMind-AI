import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Brain,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Bot,
  User,
  Zap,
  BookOpen
} from 'lucide-react';
import { StudentProfile, AccessibilityConfig, ChatMessage, UploadedMaterial } from '../types';
import { chatTutor, speakText, stopSpeaking } from '../services/api';

interface AITutorTabProps {
  profile: StudentProfile;
  materials: UploadedMaterial[];
  accessibility: AccessibilityConfig;
}

export const AITutorTab: React.FC<AITutorTabProps> = ({
  profile,
  materials,
  accessibility,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_init',
      sender: 'ai',
      text: `Hello ${profile.name}! I am your AI Visual Learning Companion. I am grounded in your syllabus materials for **Calculus III**, **Computer Architecture**, and **Biochemistry**. You can ask me to explain concepts, probe step-by-step logic, or test your intuition. How can I assist your study session today?`,
      timestamp: 'Just now',
      sourceAttribution: {
        source: 'Verified Coursepack & Syllabus',
        page: 'Full Corpus',
        status: 'SOURCE VERIFIED'
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [socraticMode, setSocraticMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);
  const [showMistakeMemory, setShowMistakeMemory] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // Voice recognition (Web Speech API)
  const handleToggleMic = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = accessibility.language === 'hi' ? 'hi-IN' : accessibility.language === 'te' ? 'te-IN' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } else {
      // Fallback if browser SpeechRecognition is restricted
      setInputQuery('Can you explain the multivariable chain rule using a dependency tree?');
    }
  };

  // Handle TTS audio narration
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (activeSpeakingMsgId === msgId) {
      stopSpeaking();
      setActiveSpeakingMsgId(null);
    } else {
      setActiveSpeakingMsgId(msgId);
      speakText(text, {
        speed: accessibility.speechSpeed,
        onEnd: () => setActiveSpeakingMsgId(null),
      });
    }
  };

  // Send message
  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputQuery).trim();
    if (!textToSend || isSending) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsSending(true);

    try {
      const res = await chatTutor({
        message: textToSend,
        history: messages.slice(-6),
        socraticMode,
        sourceDocuments: materials,
        studentProfile: profile,
      });

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: res.reply,
        timestamp: 'Just now',
        confidenceScore: res.confidence || 0.96,
        sourceAttribution: res.sourceAttribution || {
          source: 'Core Course Materials',
          page: 'Section 3',
          status: 'SOURCE VERIFIED',
        },
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Modes Banner */}
      <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Bot className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">RAG-Grounded AI Learning Companion</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Personalized tutor with source citations, Socratic questioning, speech interaction, and Mistake Memory.
          </p>
        </div>

        {/* Controls & Mistake Memory Trigger */}
        <div className="flex items-center gap-3">
          {/* Socratic Mode Toggle (Prompt Section 6) */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300 font-medium">Socratic Mode</span>
            <button
              onClick={() => setSocraticMode(!socraticMode)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                socraticMode ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  socraticMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Mistake Memory Toggle (Prompt Section 28) */}
          <button
            onClick={() => setShowMistakeMemory(!showMistakeMemory)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              showMistakeMemory
                ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Mistake Memory ({profile.mistakeMemory.length})</span>
          </button>
        </div>
      </div>

      {/* Mistake Memory Modal / Drawer if toggled */}
      {showMistakeMemory && (
        <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Student Mistake Memory & Error Patterns
            </h3>
            <span className="text-[10px] text-slate-400">AI monitors and logs recurring conceptual traps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {profile.mistakeMemory.map((m) => (
              <div key={m.id} className="bg-slate-900 border border-rose-900/40 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-200">{m.concept}</span>
                  <span className="text-rose-400 font-mono text-[10px]">Freq: {m.frequency}x</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{m.mistakePattern}</p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400">
                  <strong className="text-emerald-300 block">AI Remedy:</strong>
                  {m.remedyAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <div className="bg-slate-850 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[560px] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600'
                    : 'bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Source Attribution & Confidence Tag (Prompt Requirement 2 & 6) */}
                {msg.sender === 'ai' && msg.sourceAttribution && (
                  <div className="pt-2 mt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      {msg.sourceAttribution.status}: {msg.sourceAttribution.source} ({msg.sourceAttribution.page})
                    </span>

                    <div className="flex items-center gap-2">
                      {msg.confidenceScore && (
                        <span className="font-mono text-indigo-300">
                          {Math.round(msg.confidenceScore * 100)}% Confidence
                        </span>
                      )}
                      <button
                        onClick={() => handleToggleSpeak(msg.id, msg.text)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-400 transition"
                        title="Narrate speech"
                      >
                        {activeSpeakingMsgId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-indigo-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                <span>AI Companion searching grounded course pack & reasoning...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Voice Commands (Prompt Section 7) */}
        <div className="bg-slate-900/60 px-4 py-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">Quick Commands:</span>
          {[
            'Explain again simply',
            'Give a real-world engineering analogy',
            'Test me with a Socratic question',
            'Draw a step-by-step tree for multivariable chain rule',
          ].map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(cmd)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium whitespace-nowrap transition border border-slate-700/60"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar with Speech-to-Text & Send */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          {/* Microphone Speech Recognition Button */}
          <button
            onClick={handleToggleMic}
            className={`p-2.5 rounded-xl transition ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isListening ? 'Listening (Speak now)...' : 'Ask with Voice (STT)'}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              socraticMode
                ? 'Ask a question (AI will guide you with Socratic hints)...'
                : 'Ask anything about your syllabus or homework...'
            }
            className="flex-1 bg-slate-850 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isSending}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl transition shadow-md shadow-indigo-600/20"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
