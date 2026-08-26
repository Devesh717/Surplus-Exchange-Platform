import React from 'react';
import { ArrowUpRight, Mail, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900 text-white"><Zap size={16} fill="currentColor" /></span>
            surplusexchange
          </button>
          <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">A business marketplace for buying and selling surplus inventory with better visibility, pricing, and reuse.</p>
          <a href="mailto:support@surplusexchange.com" className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-700"><Mail size={15} /> support@surplusexchange.com</a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Marketplace</p>
          <div className="mt-4 grid gap-2.5 text-sm text-gray-500">
            <button onClick={() => navigate('/products')} className="text-left hover:text-gray-900">Explore products</button>
            <button onClick={() => navigate('/login')} className="text-left hover:text-gray-900">Sign in</button>
            <button onClick={() => navigate('/register')} className="text-left hover:text-gray-900">Create account</button>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">For sellers</p>
          <div className="mt-4 grid gap-2.5 text-sm text-gray-500">
            <button onClick={() => navigate("/become-seller")} className="flex items-center gap-1 hover:text-gray-900">Become a seller <ArrowUpRight size={13} /></button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 text-xs text-gray-400 sm:flex-row"><span>© {new Date().getFullYear()} Surplus Exchange. All rights reserved.</span><span>Built for smarter inventory reuse.</span></div>
      </div>
    </footer>
  );
}
