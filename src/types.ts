export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type FAQCategory = 'General' | 'Technical' | 'Billing' | 'Account';
