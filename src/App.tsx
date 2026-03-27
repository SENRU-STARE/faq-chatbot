/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQGrid } from './components/FAQGrid';
import { ChatInterface } from './components/ChatInterface';
import { 
  MessageSquare, 
  LayoutGrid, 
  Settings, 
  HelpCircle, 
  Search, 
  Zap,
  ChevronRight,
  LifeBuoy,
  ShieldCheck
} from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <div className="flex h-screen bg-[#F8F9FB] text-gray-900 font-sans selection:bg-indigo-600 selection:text-white overflow-hidden">
      {/* 1. Left Navigation Rail */}
      <aside className="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-8 gap-8 shrink-0">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <div className="w-5 h-5 bg-white rounded-sm rotate-45" />
        </div>
        
        <nav className="flex flex-col gap-4 flex-1">
          {[
            { icon: MessageSquare, label: 'Chat' },
            { icon: LayoutGrid, label: 'KB' },
            { icon: LifeBuoy, label: 'Support' },
            { icon: ShieldCheck, label: 'Security' }
          ].map((item, i) => (
            <button 
              key={i}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all group relative",
                i === 0 ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="absolute left-16 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <button className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-all">
          <Settings className="w-5 h-5" />
        </button>
      </aside>

      {/* 2. Main Chat Area (Center) */}
      <main className="flex-1 flex flex-col bg-white shadow-[0_0_40px_rgba(0,0,0,0.02)] z-10">
        <header className="h-20 border-b border-gray-50 flex items-center justify-between px-8 shrink-0">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Starebot Assistant</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Support Active</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              Upgrade
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </main>

      {/* 3. Right Knowledge Rail (FAQ) */}
      <aside className="w-[400px] hidden lg:flex flex-col bg-[#F8F9FB] shrink-0">
        <div className="p-8 flex flex-col h-full">
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Instant Answers</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-gray-900">Trending Topics</h4>
                <Zap className="w-3 h-3 text-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['API Keys', 'Billing', 'Security', 'Webhooks'].map(tag => (
                  <button key={tag} className="px-3 py-2 bg-white border border-gray-100 rounded-lg text-xs font-medium text-gray-600 hover:border-indigo-200 hover:text-indigo-600 transition-all text-left">
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            <section className="flex-1">
              <h4 className="text-xs font-bold text-gray-900 mb-4">Common Questions</h4>
              <div className="space-y-2">
                <FAQGrid compact />
              </div>
            </section>
          </div>

          <div className="mt-8 p-6 bg-indigo-600 rounded-3xl text-white relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h4 className="font-bold mb-1 relative z-10">Need human help?</h4>
            <p className="text-xs text-indigo-100 mb-4 relative z-10">Our team is available 24/7 for enterprise customers.</p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-all relative z-10">
              Contact Support
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}



