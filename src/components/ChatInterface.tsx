import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Sparkles, Paperclip, Globe, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { getChatResponse } from '../services/gemini';
import { cn } from '../lib/utils';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Starebot. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const response = await getChatResponse(input, history);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-smooth px-8 py-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4",
                msg.role === 'user' ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-gray-50 text-gray-400" : "bg-indigo-600 text-white"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn(
                "flex-1 space-y-1",
                msg.role === 'user' ? "text-right" : ""
              )}>
                <div className={cn(
                  "inline-block p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-indigo-600 text-white rounded-tr-none text-left" 
                    : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100"
                )}>
                  <div className="markdown-body prose prose-sm max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-1">
                  {msg.role === 'user' ? 'You' : 'Starebot'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="inline-block p-4 rounded-2xl rounded-tl-none bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-8 bg-white border-t border-gray-50">
        <div className="max-w-2xl mx-auto relative">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message here..."
            className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 transition-all resize-none shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all",
              input.trim() && !isLoading 
                ? "bg-indigo-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200" 
                : "bg-gray-200 text-white cursor-not-allowed"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-4 font-medium">
          Starebot is powered by InsightFlow AI. Always verify critical information.
        </p>
      </div>
    </div>
  );
}

