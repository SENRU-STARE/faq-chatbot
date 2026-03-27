/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FAQGrid } from './components/FAQGrid';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
            </div>
            <span className="font-bold text-xl tracking-tight">InsightFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Product</a>
            <a href="#" className="hover:text-black transition-colors">Solutions</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
            <a href="#" className="text-black">Support</a>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all">
            Get Started
          </button>
        </div>
      </nav>

      <main>
        <FAQGrid />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm rotate-45" />
            </div>
            <span className="font-bold text-lg tracking-tight">InsightFlow</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 InsightFlow Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Cookie Policy</a>
          </div>
        </div>
      </footer>

      <ChatInterface />
    </div>
  );
}

