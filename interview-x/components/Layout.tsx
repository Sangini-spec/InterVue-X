
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Sun, Moon, LogOut, User } from 'lucide-react';
import { getSession, clearSession } from '../utils/auth';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  // Sync state with HTML class
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  // Check for logged in user on mount and route change
  useEffect(() => {
    const sessionUser = getSession();
    setUser(sessionUser);
  }, [location]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogout = () => {
    clearSession();
    setUser(null);
    navigate('/login');
  };

  const navItems = [
    { name: 'Interviews', path: '#', hasDropdown: true },
    { name: 'Resume', path: '/resume-builder', hasDropdown: true },
    { name: 'Jobs', path: '/jobs', hasDropdown: false },
    { name: 'Pricing', path: '/pricing', hasDropdown: false },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans text-zinc-900 dark:text-zinc-200 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 py-4 px-6 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-50 transition-colors duration-300 print:hidden">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* Left: Logo & Main Nav */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                InterVue <span className="text-purple-600 dark:text-purple-500">X</span>
              </span>
            </NavLink>

            {/* Nav Links - Increased to text-base */}
            <nav className="hidden md:flex items-center gap-8 text-base font-medium text-zinc-600 dark:text-zinc-400">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button 
                    onClick={() => item.path !== '#' && navigate(item.path)}
                    className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors focus:outline-none py-2"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown size={14} className="mt-0.5 group-hover:rotate-180 transition-transform duration-200" />}
                  </button>

                  {/* Interviews Dropdown */}
                  {item.name === 'Interviews' && (
                    <div className="absolute top-full left-0 pt-4 w-[500px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                       <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-8 relative overflow-hidden">
                         
                         {/* Column 1: By Company */}
                         <div>
                           <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                             By Company
                           </h4>
                           <ul className="space-y-3">
                             {[
                               { name: 'JPMorgan Chase', id: 'jpmorgan' },
                               { name: 'Netflix', id: 'netflix' },
                               { name: 'HCL', id: 'hcl' },
                               { name: 'NVIDIA', id: 'nvidia' },
                               { name: 'Cognizant', id: 'cognizant' },
                               { name: 'Wipro', id: 'wipro' }
                             ].map(company => (
                               <li key={company.id}>
                                 <button 
                                    onClick={() => navigate(`/company/${company.id}`)}
                                    className="text-left w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors block"
                                 >
                                   {company.name}
                                 </button>
                               </li>
                             ))}
                           </ul>
                         </div>

                         {/* Column 2: Other Interviews */}
                         <div>
                           <h4 className="font-bold text-zinc-900 dark:text-white text-sm mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                             Other Interviews
                           </h4>
                           <ul className="space-y-3">
                             <li>
                                <button onClick={() => navigate('/create-interview')} className="text-left w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors block">
                                   Create Your Interviews
                                </button>
                             </li>
                             <li>
                               <button onClick={() => navigate('/salary-negotiation')} className="text-left w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors block">
                                 Salary Negotiation Interview
                               </button>
                             </li>
                             <li>
                               <button onClick={() => navigate('/job-description-interview')} className="text-left w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors block">
                                 Interviews by Job Description
                               </button>
                             </li>
                             <li>
                               <button onClick={() => navigate('/system-design-interview')} className="text-left w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors block">
                                 System Design Interview
                               </button>
                             </li>
                           </ul>
                         </div>

                         {/* Footer Link */}
                         <div className="col-span-2 mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                           <button 
                             onClick={() => navigate('/contact')}
                             className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 w-full text-left"
                           >
                             Explore More <span className="text-xs">»</span>
                           </button>
                         </div>
                       </div>
                    </div>
                  )}

                  {/* Resume Dropdown */}
                  {item.name === 'Resume' && (
                    <div className="absolute top-full left-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                       <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-4">
                          <ul className="space-y-2">
                            <li><button onClick={() => navigate('/resume-builder')} className="text-left w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-purple-600 block">Resume Builder</button></li>
                            <li><button onClick={() => navigate('/resume-review')} className="text-left w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-purple-600 block">Resume Review</button></li>
                          </ul>
                       </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
                <div className="relative group">
                    <button className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate max-w-[100px] md:max-w-none">
                            {user.name}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </button>
                    
                    {/* User Dropdown */}
                    <div className="absolute top-full right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden p-1">
                            <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                                <p className="text-xs text-zinc-500">Signed in as</p>
                                <p className="text-sm font-medium truncate">{user.email}</p>
                            </div>
                            <button 
                                onClick={() => navigate('/profile')}
                                className="w-full text-left px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2"
                            >
                                <User size={16} /> Profile
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center gap-2"
                            >
                                <LogOut size={16} /> Log out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="hidden md:block text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      Contact Us
                    </button>

                    <NavLink 
                      to="/login"
                      className="px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-black text-base font-semibold transition-colors"
                    >
                      Log in
                    </NavLink>
                </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
         {children}
      </main>
    </div>
  );
};
