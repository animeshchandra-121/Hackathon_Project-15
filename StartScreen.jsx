import React from 'react';

const StartScreen = ({ onSelect }) => {
  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 50%, #fbc2eb 100%)' }}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.07) 0, transparent 60%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.07) 0, transparent 60%)' }} />
      <div className="z-10 w-full max-w-4xl flex flex-row items-center justify-center gap-6 bg-white rounded-3xl shadow-2xl p-10 animate-fade-in-up">
        {/* Left: Welcome box */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-10">
          {/* Gradient accent bar */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 shadow-lg animate-accent-bar" />
          <div className="mb-8 mt-4">
            <span className="inline-block bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-full shadow-lg animate-bounce-slow">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#6366f1" opacity="0.15"/><path d="M24 14v10l7 4" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center drop-shadow-lg">Welcome to LaunchMate</h1>
          <p className="text-lg text-gray-700 mb-8 text-center">Create, customize, and launch your dream landing page in minutes.</p>
          <div className="flex flex-col gap-4 w-full mt-4">
            <button
              className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-xl hover:bg-blue-700 text-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-fade-in"
              onClick={() => onSelect('autogenerate')}
              type="button"
            >
              Autogenerate a Page
            </button>
            <button
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-400 text-black rounded-xl shadow-xl hover:from-green-600 hover:to-teal-500 text-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 animate-fade-in"
              onClick={() => onSelect('manual')}
              type="button"
            >
              Build My Own
            </button>
          </div>
        </div>
        {/* Right: Illustration and message */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 animate-fade-in-up">
          <div className="mb-6 animate-illustration-float">
            <svg width="180" height="140" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="110" cy="160" rx="90" ry="18" fill="#6366f1" opacity="0.08"/>
              <rect x="40" y="40" width="140" height="80" rx="18" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
              <rect x="60" y="60" width="100" height="12" rx="6" fill="#6366f1" opacity="0.2"/>
              <rect x="60" y="80" width="60" height="12" rx="6" fill="#6366f1" opacity="0.2"/>
              <rect x="60" y="100" width="80" height="12" rx="6" fill="#6366f1" opacity="0.2"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center drop-shadow">Design. Launch. Impress.</h2>
          <p className="text-base text-gray-600 text-center max-w-xs">Start with a template or build your own. <span className="font-semibold text-blue-600">LaunchMate</span> makes it easy to create beautiful landing pages in minutes. <span className="font-semibold text-green-500">No coding required!</span></p>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes accent-bar {
          0% { width: 0; opacity: 0; }
          100% { width: 8rem; opacity: 1; }
        }
        .animate-accent-bar { animation: accent-bar 1.2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes illustration-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-illustration-float { animation: illustration-float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default StartScreen; 