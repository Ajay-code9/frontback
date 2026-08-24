import React, { useState } from 'react';

function IbMarketingTools({ admin }) {
  const [copied, setCopied] = useState(false);
  const refLink = `http://localhost:3000/user?ref=${admin?.ibCode || 'IB-1042'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 text-white p-6 rounded-xl border border-purple-900/50 shadow-lg">
        <h1 className="text-2xl font-bold">IB Marketing & Referral Tools</h1>
        <p className="text-purple-200 text-sm mt-1">Promote your IB link and onboard new traders to earn rebate commissions</p>
      </div>

      {/* Referral Link Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-purple-200 dark:border-slate-700 shadow-sm p-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Your Direct Referral Link</h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">Share this link on social media, websites, or messaging apps</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={refLink}
            readOnly
            className="flex-1 p-3 bg-purple-50 dark:bg-slate-700/50 border border-purple-200 dark:border-slate-600 rounded-lg text-purple-700 dark:text-purple-300 font-mono text-sm font-bold"
          />
          <button
            onClick={copyToClipboard}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-lg transition shadow-md"
          >
            {copied ? '✓ Copied!' : 'Copy Referral Link'}
          </button>
        </div>
      </div>

      {/* Banners & Embed Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-purple-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">HTML Web Widget Embed</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Copy & paste into your website HTML to show live forex ticker</p>
          <textarea
            readOnly
            rows="3"
            value={`<iframe src="http://localhost:3000/widget/ticker?ref=${admin?.ibCode || 'IB-1042'}" width="100%" height="60" frameborder="0"></iframe>`}
            className="w-full p-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg font-mono text-xs text-gray-700 dark:text-slate-300"
          />
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-purple-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Promotional Social Banners</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Download high-resolution banners (1080x1080 & 1200x628)</p>
          <button className="px-4 py-2.5 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 rounded-lg text-xs font-bold transition">
            ↓ Download Marketing Pack (.zip)
          </button>
        </div>
      </div>
    </div>
  );
}

export default IbMarketingTools;
