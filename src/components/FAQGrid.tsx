import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronUp, BookOpen, HelpCircle } from 'lucide-react';
import { FAQ_DATA, CATEGORIES } from '../constants';
import { cn } from '../lib/utils';

export function FAQGrid() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = FAQ_DATA.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-black/60 text-[10px] uppercase tracking-widest font-bold mb-4"
        >
          <HelpCircle className="w-3 h-3" />
          Knowledge Base
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-bold tracking-tight text-gray-900 mb-4"
        >
          How can we help?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg max-w-xl mx-auto"
        >
          Search our knowledge base or chat with our AI assistant for instant answers.
        </motion.p>
      </div>

      {/* Search & Filter */}
      <div className="space-y-6 mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for questions, topics, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-lg"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === cat 
                  ? "bg-black text-white shadow-lg shadow-black/10" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              layout
              key={faq.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300",
                expandedId === faq.id ? "shadow-xl border-black/5 ring-1 ring-black/5" : "hover:border-gray-200"
              )}
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    expandedId === faq.id ? "bg-black text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                  )}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1 block">
                      {faq.category}
                    </span>
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                </div>
                {expandedId === faq.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              
              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed pl-20">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No results found for "{search}"</p>
            <button 
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="text-black font-semibold mt-2 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
