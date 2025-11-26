import React from 'react';
import { HelpIcon, DocumentsIcon, MessagesIcon } from '../Icons';

function UserHelp({ user }) {
  const faqs = [
    { id: 1, question: 'How do I create a new project?', answer: 'Click on the Projects tab and then click "Create New Project" button.' },
    { id: 2, question: 'Can I invite team members?', answer: 'Yes, you can invite team members from the Team section.' },
    { id: 3, question: 'How do I change my password?', answer: 'Go to Settings > Security to change your password.' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Help & Support</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Get help and find answers to your questions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700 text-center">
          <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
            <DocumentsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Documentation</h3>
          <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Browse our comprehensive guides</p>
          <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
            View Docs
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700 text-center">
          <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
            <MessagesIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Live Chat</h3>
          <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Chat with our support team</p>
          <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
            Start Chat
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700 text-center">
          <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
            <HelpIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Email Support</h3>
          <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Send us an email</p>
          <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
            Contact Us
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-blue-200 dark:border-slate-700 rounded p-3">
              <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">{faq.question}</h4>
              <p className="text-xs text-gray-600 dark:text-slate-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHelp;
