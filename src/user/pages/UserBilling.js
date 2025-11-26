import React from 'react';
import { BillingIcon } from '../Icons';

function UserBilling({ user }) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Billing & Subscription</h1>
        <p className="text-sm text-gray-600 dark:text-slate-400">Manage your subscription and payments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Current Plan</h3>
          <div className="bg-blue-600 dark:bg-blue-500 rounded-lg p-4 text-white">
            <h4 className="text-base font-semibold mb-1">Pro Plan</h4>
            <p className="text-blue-100 mb-2 text-sm">$29/month</p>
            <ul className="space-y-1 text-xs">
              <li className="text-blue-100">✓ Unlimited projects</li>
              <li className="text-blue-100">✓ Advanced analytics</li>
              <li className="text-blue-100">✓ Priority support</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Payment Method</h3>
          <div className="border border-blue-200 dark:border-slate-700 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BillingIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-600 dark:text-slate-400">Expires 12/25</p>
                </div>
              </div>
              <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors text-sm">Edit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Billing History</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-slate-700/50 rounded border border-blue-200 dark:border-slate-600">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Pro Plan - January 2024</p>
                <p className="text-xs text-gray-600 dark:text-slate-400">Jan 15, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">$29.00</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">Paid</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserBilling;
