import { FAQItem } from './types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    category: 'General',
    question: 'What is InsightFlow?',
    answer: 'InsightFlow is an advanced knowledge management platform designed to help teams organize and access information seamlessly using AI.'
  },
  {
    id: '2',
    category: 'General',
    question: 'How do I get started?',
    answer: 'You can get started by creating an account and importing your existing documentation or by manually adding FAQ items to your knowledge base.'
  },
  {
    id: '3',
    category: 'Technical',
    question: 'Does InsightFlow support API integrations?',
    answer: 'Yes, we offer a robust REST API that allows you to integrate InsightFlow with your existing tools and workflows.'
  },
  {
    id: '4',
    category: 'Technical',
    question: 'Is my data secure?',
    answer: 'Security is our top priority. We use industry-standard encryption and follow best practices to ensure your data is protected at all times.'
  },
  {
    id: '5',
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
  },
  {
    id: '6',
    category: 'Account',
    question: 'How can I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.'
  }
];

export const CATEGORIES = ['General', 'Technical', 'Billing', 'Account'] as const;
