
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, History, Save, Calendar, Clock, Award, FileText, TrendingUp, AlertTriangle, X, CheckCircle, ArrowLeft } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  skills: string;
}

interface HistoryItem {
  id: string;
  date: string;
  role: string;
  round: string;
  score: number;
  feedback: string;
  reportData: any;
}

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    role: '',
    bio: '',
    skills: ''
  });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedSession, setSelectedSession] = useState<HistoryItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load User
    const storedUser = localStorage.getItem('intervue_user');
    if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(prev => ({ ...prev, ...parsed }));
    }

    // Load History
    const storedHistory = localStorage.getItem('intervue_history');
    if (storedHistory) {
        try {
            setHistory(JSON.parse(storedHistory));
        } catch (e) {
            console.error("Failed to parse history", e);
        }
    }
  }, []);

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
        // Update active session
        localStorage.setItem('intervue_user', JSON.stringify(user));
        
        // Also update the 'database' to ensure persistence across re-logins
        try {
            const db = JSON.parse(localStorage.getItem('intervue_users_db') || '[]');
            const updatedDb = db.map((u: any) => 
                u.email === user.email ? { ...u, ...user } : u
            );
            localStorage.setItem('intervue_users_db', JSON.stringify(updatedDb));
        } catch (e) {
            console.error("Failed to update user database", e);
        }

        setIsSaving(false);
        // Navigate to dashboard immediately instead of reloading to prevent blank screen
        navigate('/');
    }, 800);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
  };

  // --- Sub-component for Report Detail Modal ---
  const SessionDetailModal = ({ session, onClose }: { session: HistoryItem, onClose: () => void }) => {
    const { reportData } = session;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900">
                    <div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{session.role} Interview</h3>
                        <p className="text-sm text-zinc-500">{formatDate(session.date)} • {session.round} Round</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <X size={20} className="text-zinc-500" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                     {/* Score */}
                    <div className="flex items-center justify-center py-4">
                        <div className="relative inline-flex items-center justify-center">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-200 dark:text-zinc-800" />
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351} strokeDashoffset={351 - (351 * reportData.score) / 100} className="text-purple-600" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-zinc-900 dark:text-white">{reportData.score}</span>
                                <span className="text-xs text-zinc-500 uppercase font-medium">Score</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                        <h4 className="font-semibold text-sm mb-2 text-zinc-900 dark:text-white flex items-center gap-2">
                            <FileText size={14} className="text-blue-500" /> Executive Summary
                        </h4>
                        <p className="text-zinc-600 dark:text-zinc-300 italic">{reportData.feedback}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/20">
                            <h4 className="font-bold text-sm text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                                <TrendingUp size={16} /> Strengths
                            </h4>
                            <ul className="space-y-2">
                                {reportData.strengths.map((s: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-green-900 dark:text-green-200">
                                        <CheckCircle size={14} className="mt-0.5 shrink-0" /> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/20">
                            <h4 className="font-bold text-sm text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                                <AlertTriangle size={16} /> Improvements
                            </h4>
                            <ul className="space-y-2">
                                {reportData.improvements.map((s: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-orange-900 dark:text-orange-200">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" /> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto">
            
            {/* Back Button */}
            <button 
                onClick={() => navigate('/')} 
                className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">My Profile</h1>
                <p className="text-zinc-500 dark:text-zinc-400">Manage your account settings and view interview history.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-zinc-200 dark:border-zinc-800 mb-8">
                <button 
                    onClick={() => setActiveTab('profile')}
                    className={`pb-4 text-sm font-medium transition-all relative ${
                        activeTab === 'profile' 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <User size={18} /> Profile Settings
                    </div>
                    {activeTab === 'profile' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 rounded-t-full" />}
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`pb-4 text-sm font-medium transition-all relative ${
                        activeTab === 'history' 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <History size={18} /> Interview History
                    </div>
                    {activeTab === 'history' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 rounded-t-full" />}
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[500px]">
                
                {/* --- Profile Settings Tab --- */}
                {activeTab === 'profile' && (
                    <div className="p-8 max-w-2xl">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-3xl font-bold border-2 border-white dark:border-zinc-800 shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{user.name}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Display Name</label>
                                    <input 
                                        type="text" 
                                        value={user.name}
                                        onChange={(e) => setUser({...user, name: e.target.value})}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={user.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        disabled
                                        title="Email cannot be changed"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Current Role / Title</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Senior Frontend Engineer"
                                    value={user.role || ''}
                                    onChange={(e) => setUser({...user, role: e.target.value})}
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Bio & Credentials</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Briefly describe your experience, key skills, and career goals..."
                                    value={user.bio || ''}
                                    onChange={(e) => setUser({...user, bio: e.target.value})}
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Skills (Comma separated)</label>
                                <input 
                                    type="text" 
                                    placeholder="React, Node.js, TypeScript..."
                                    value={user.skills || ''}
                                    onChange={(e) => setUser({...user, skills: e.target.value})}
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div className="pt-4">
                                <button 
                                    onClick={handleSaveProfile}
                                    disabled={isSaving}
                                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- History Tab --- */}
                {activeTab === 'history' && (
                    <div className="p-0">
                        {history.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                                <History size={48} className="mb-4 opacity-20" />
                                <p className="text-lg font-medium mb-1">No interview history yet</p>
                                <p className="text-sm">Complete your first mock interview to see analytics here.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {history.map((session) => (
                                    <div 
                                        key={session.id} 
                                        onClick={() => setSelectedSession(session)}
                                        className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group flex items-center justify-between"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                                                session.score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                session.score >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                                {session.score}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-zinc-900 dark:text-white text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                    {session.role}
                                                </h4>
                                                <div className="flex items-center gap-4 text-sm text-zinc-500 mt-1">
                                                    <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(session.date)}</span>
                                                    <span className="flex items-center gap-1"><Award size={14} /> {session.round}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right hidden md:block">
                                             <button className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                                                View Report
                                             </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Modal */}
        {selectedSession && (
            <SessionDetailModal 
                session={selectedSession} 
                onClose={() => setSelectedSession(null)} 
            />
        )}
    </div>
  );
};
