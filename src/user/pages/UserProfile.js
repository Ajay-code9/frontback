import React, { useState } from 'react';

function UserProfile({ user }) {
  const [kycStatus, setKycStatus] = useState(user?.kycStatus || 'Verified');
  const [docSubmitted, setDocSubmitted] = useState(false);

  const handleSubmitKyc = (e) => {
    e.preventDefault();
    setKycStatus('Pending');
    setDocSubmitted(true);

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find(u => u.id === user.id || u.email === user.email);
    if (currentUser) {
      currentUser.kycStatus = 'Pending';
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'T'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || 'Trader'}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  kycStatus === 'Verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  kycStatus === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  KYC {kycStatus}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{user?.email} • {user?.country || 'Canada'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-slate-400">Broker IB Partner Code</p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm mt-0.5">{user?.ibCode || 'IB-1042'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Trader Account Info</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="w-full p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Country of Residence</label>
              <input
                type="text"
                defaultValue={user?.country || 'Canada'}
                className="w-full p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* KYC Verification Center */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">KYC Verification Center</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">Upload identity verification documents to unlock higher withdrawal limits</p>

          {docSubmitted && (
            <div className="mb-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 text-emerald-700 dark:text-emerald-300 p-3 rounded-lg text-xs font-semibold">
              ✓ Documents submitted successfully. Compliance team will review within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmitKyc} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Government Issued ID / Passport</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 p-4 text-center rounded-lg hover:border-blue-500 transition cursor-pointer">
                <p className="text-xs text-gray-600 dark:text-slate-300 font-medium">Click to upload Passport or National Driving License</p>
                <p className="text-[10px] text-gray-400 mt-1">PNG, JPG or PDF up to 10MB</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Proof of Address (Utility Bill / Bank Statement)</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 p-4 text-center rounded-lg hover:border-blue-500 transition cursor-pointer">
                <p className="text-xs text-gray-600 dark:text-slate-300 font-medium">Click to upload recent Utility Bill or Bank Statement</p>
                <p className="text-[10px] text-gray-400 mt-1">Issued within last 3 months</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition shadow-sm"
            >
              Submit Verification Documents
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
