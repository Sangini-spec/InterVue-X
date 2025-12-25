
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 pt-20 pb-10 px-6 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
            {/* Brand Column - spans 2 cols */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">InterVue X</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
                InterVue X is an impact-first start-up with a mission to empower job seekers globally through GenAI solutions. We provide real-time interview practices with actionable feedback to track and enhance a candidate’s interview performance.
              </p>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-200 mb-6">About</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Request Role</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Topics</a></li>
              </ul>
            </div>

            {/* Business Solutions */}
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-200 mb-6">Business Solutions</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">For Business</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">For Schools</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">For Colleges</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">AI Proctoring</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Enterprise</a></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Contact Us</button></li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-200 mb-6">Policies</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Trust Center</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-200 mb-6">Resources</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Gifting</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
            <div>© 2024 InterVue X. All rights reserved.</div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Security</a>
                <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
  );
};
