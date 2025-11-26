import React from 'react';
import { DocumentsIcon } from '../Icons';

function UserDocuments({ user }) {
  const documents = [
    { id: 1, name: 'Project Proposal.pdf', size: '2.4 MB', date: '2024-01-10', type: 'pdf' },
    { id: 2, name: 'Design Mockups.pptx', size: '5.1 MB', date: '2024-01-12', type: 'ppt' },
    { id: 3, name: 'Meeting Notes.docx', size: '1.2 MB', date: '2024-01-14', type: 'doc' },
    { id: 4, name: 'Budget Sheet.xlsx', size: '856 KB', date: '2024-01-15', type: 'xls' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Documents</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Manage all your files and documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-blue-200 dark:border-slate-700">
            <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
              <DocumentsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">{doc.name}</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{doc.size} • {doc.date}</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-1.5 rounded text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                View
              </button>
              <button className="flex-1 bg-white dark:bg-slate-700 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 py-1.5 rounded text-xs font-medium hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm">
        Upload New Document
      </button>
    </div>
  );
}

export default UserDocuments;
