"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Sun,
  Zap,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

interface QuoteData {
  system_type: "ongrid" | "hybrid";
  load_kw: number;
  ac_units: number;
  recommendedSystemSizeKw: number;
  estimatedPanelCount: number;
  estimatedMonthlyGenerationKwh: number;
  estimatedAnnualGenerationKwh: number;
  estimatedAnnualSavingsPkr: number;
  whatsappLink: string;
}

interface MessageAction {
  type: "Maps_to_page" | "calculate_solar_quote";
  args: Record<string, unknown>;
  payload?: {
    path?: string;
    quote?: QuoteData;
  };
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: MessageAction[];
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "Calculate Solar Quote for my home",
  "How does MEPCO net metering work?",
  "What is the price of 10kW hybrid system?",
  "Which solar panels and inverters do you use?",
  "What warranty do you offer?",
];

export function ChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Hello! I am your ALP Solar AI Assistant. How can I help you today? Ask me about solar packages, AlpSolarr inverters, MEPCO net metering, or calculate an instant quote!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<unknown>(null);

  // Initialize Speech Recognition & Synthesis capability check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
          .SpeechRecognition ||
        (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
          .webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);
        try {
          const rec = new (SpeechRecognition as new () => {
            continuous: boolean;
            interimResults: boolean;
            lang: string;
            onresult: (e: { results: Array<Array<{ transcript: string }>> }) => void;
            onerror: (e: unknown) => void;
            onend: () => void;
            start: () => void;
            stop: () => void;
          })();
          rec.continuous = false;
          rec.interimResults = false;
          rec.lang = "en-US";

          rec.onresult = (event: { results: Array<Array<{ transcript: string }>> }) => {
            const transcript = event.results?.[0]?.[0]?.transcript;
            if (transcript) {
              setInput(transcript);
              handleSendMessage(transcript);
            }
            setIsListening(false);
          };

          rec.onerror = (err) => {
            console.warn("Speech recognition error:", err);
            setIsListening(false);
          };

          rec.onend = () => {
            setIsListening(false);
          };

          recognitionRef.current = rec;
        } catch (e) {
          console.warn("Speech recognition initialization failed:", e);
        }
      }
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Handle Speech Output (TTS)
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      // Clean markdown tags or bullets for cleaner speech
      const cleanSpeech = text.replace(/[*#_`[\]()]/g, " ").trim();
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("TTS Error:", e);
      setIsSpeaking(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    try {
      const rec = recognitionRef.current as { start: () => void; stop: () => void };
      if (isListening) {
        rec.stop();
        setIsListening(false);
      } else {
        setIsListening(true);
        rec.start();
      }
    } catch (e) {
      console.warn("Failed to toggle speech recognition:", e);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput("");

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m) => m.id !== "welcome-msg")
        .map((m) => ({
          role: m.role === "assistant" ? ("model" as const) : ("user" as const),
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        content:
          data.reply ||
          "I do not have information about this. You can contact us on our WhatsApp for more details.",
        actions: data.actions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Speak response if enabled
      speakText(assistantMessage.content);

      // Handle Client Navigation Actions automatically if Maps_to_page triggered
      if (data.actions && data.actions.length > 0) {
        for (const action of data.actions) {
          if (action.type === "Maps_to_page" && action.payload?.path) {
            const targetPath = action.payload.path;
            setTimeout(() => {
              router.push(targetPath);
            }, 1200);
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "I do not have information about this. You can contact us on our WhatsApp for more details.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Chat reset! What would you like to know about ALP Solar systems, net metering, or quotations?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-16 items-center gap-3 rounded-full bg-[#0F172A] px-5 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#1E293B] hover:shadow-[0_10px_25px_rgba(245,158,11,0.35)] active:scale-95 border border-slate-700/60"
          aria-label="Open ALP Solar AI Assistant"
        >
          {/* Animated Glow Halo */}
          <div className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#22C55E] to-[#F59E0B] opacity-70 blur-sm group-hover:opacity-100 transition duration-500 animate-pulse" />

          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#D97706] text-slate-950 shadow-md">
            <Sun className="h-6 w-6 animate-[spin_8s_linear_infinite]" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#22C55E] ring-2 ring-[#0F172A]">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div className="flex flex-col items-start pr-1 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
              ALP Solar AI
            </span>
            <span className="text-sm font-bold text-white flex items-center gap-1">
              Ask Question <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
            </span>
          </div>
        </button>
      )}

      {/* Main Chat Dialog Window */}
      {isOpen && (
        <div
          className="flex h-[600px] w-[95vw] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0F172A] text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-6 duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-slate-800 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#F59E0B] to-[#D97706] text-slate-950 shadow-inner">
                <Sun className="h-5 w-5 animate-[spin_10s_linear_infinite]" />
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#22C55E] ring-2 ring-[#0F172A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  ALP Solar AI <span className="rounded bg-[#F59E0B]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#F59E0B]">PROD</span>
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> South Punjab Solar Expert
                </p>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1">
              {/* TTS Voice Toggle */}
              <button
                onClick={() => {
                  const next = !ttsEnabled;
                  setTtsEnabled(next);
                  if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className={`rounded-lg p-1.5 transition ${
                  ttsEnabled
                    ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
                title={ttsEnabled ? "Disable Voice Output" : "Enable Voice Output"}
                aria-label="Toggle Voice Output"
              >
                {ttsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>

              {/* Reset Chat */}
              <button
                onClick={handleClearChat}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                title="Clear Conversation"
                aria-label="Clear Conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                aria-label="Close Chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-slate-950 font-medium rounded-tr-none shadow-md"
                      : "bg-[#1E293B] text-slate-200 rounded-tl-none border border-slate-700/60 shadow-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Render Interactive Action Cards if Present */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.actions.map((act, idx) => {
                        if (act.type === "calculate_solar_quote" && act.payload?.quote) {
                          const q = act.payload.quote;
                          return (
                            <div
                              key={idx}
                              className="rounded-xl border border-amber-500/40 bg-slate-900/90 p-3.5 text-slate-100 shadow-xl space-y-3"
                            >
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F59E0B]">
                                  <Zap className="h-4 w-4" /> Solar Estimate Card
                                </div>
                                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
                                  {q.system_type}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="rounded-lg bg-slate-800/70 p-2">
                                  <span className="text-[10px] text-slate-400 block">Recommended Size</span>
                                  <span className="font-bold text-white text-sm">{q.recommendedSystemSizeKw} kW</span>
                                </div>
                                <div className="rounded-lg bg-slate-800/70 p-2">
                                  <span className="text-[10px] text-slate-400 block">Est. 580W Panels</span>
                                  <span className="font-bold text-white text-sm">{q.estimatedPanelCount} Units</span>
                                </div>
                                <div className="rounded-lg bg-slate-800/70 p-2">
                                  <span className="text-[10px] text-slate-400 block">Monthly Units</span>
                                  <span className="font-bold text-emerald-400 text-sm">~{q.estimatedMonthlyGenerationKwh.toLocaleString()} kWh</span>
                                </div>
                                <div className="rounded-lg bg-slate-800/70 p-2">
                                  <span className="text-[10px] text-slate-400 block">Annual Savings</span>
                                  <span className="font-bold text-[#F59E0B] text-sm">PKR {q.estimatedAnnualSavingsPkr.toLocaleString()}</span>
                                </div>
                              </div>

                              {/* WhatsApp Direct CTA Button */}
                              <a
                                href={q.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#22C55E] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#16A34A] active:scale-95 shadow-md"
                              >
                                <MessageCircle className="h-4 w-4" />
                                Book Site Survey on WhatsApp
                                <ArrowRight className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          );
                        }

                        if (act.type === "Maps_to_page" && act.payload?.path) {
                          const path = act.payload.path;
                          return (
                            <button
                              key={idx}
                              onClick={() => router.push(path)}
                              className="flex w-full items-center justify-between rounded-xl border border-sky-500/30 bg-sky-950/40 p-2.5 text-xs font-semibold text-sky-300 transition hover:bg-sky-900/50 hover:text-white"
                            >
                              <span className="flex items-center gap-1.5">
                                <ExternalLink className="h-3.5 w-3.5" /> View Page: {path}
                              </span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          );
                        }

                        return null;
                      })}
                    </div>
                  )}
                </div>
                <span className="mt-1 px-1 text-[10px] text-slate-500">{msg.timestamp}</span>
              </div>
            ))}

            {/* Thinking / Typing indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1E293B] border border-slate-700">
                  <Sun className="h-3.5 w-3.5 text-[#F59E0B] animate-spin" />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[#1E293B] px-3 py-1.5 border border-slate-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          {messages.length <= 2 && !isLoading && (
            <div className="flex gap-1.5 overflow-x-auto px-4 py-2 scrollbar-none border-t border-slate-800/80 bg-slate-900/50">
              {INITIAL_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug)}
                  className="whitespace-nowrap rounded-full border border-slate-700 bg-[#1E293B] px-2.5 py-1 text-[11px] font-medium text-slate-300 transition hover:border-[#F59E0B] hover:text-[#F59E0B] active:scale-95"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-slate-800 bg-[#0F172A] p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Voice Input Button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50"
                      : "bg-[#1E293B] text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                  }`}
                  title={isListening ? "Listening... Click to stop" : "Speak with Voice"}
                  aria-label="Voice Input"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}

              {/* Text Input Field */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask about solar packages, net metering..."}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-slate-700/80 bg-[#1E293B] px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:border-[#F59E0B] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] transition disabled:opacity-50"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#F59E0B] to-[#D97706] text-slate-950 transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                aria-label="Send Message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
