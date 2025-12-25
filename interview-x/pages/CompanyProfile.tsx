
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COMPANIES, CompanyProfile as CompanyProfileType } from '../data/companies';
import { 
  ArrowLeft, Globe, Linkedin, Twitter, Youtube, Instagram, 
  Share2, MessageSquare, Users, Sparkles, ArrowRight, PlayCircle,
  Briefcase, TrendingUp, Plus, X, User, Clock, CheckCircle, Eye, EyeOff
} from 'lucide-react';
import { getSession } from '../utils/auth';

interface CommunityQuestion {
  id: string;
  question: string;
  role: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  author: string;
  date: string;
  isAnonymous: boolean;
}

export const CompanyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyProfileType | null>(null);
  const [activeTab, setActiveTab] = useState<'questions' | 'community'>('questions');
  const [imgError, setImgError] = useState(false);

  // Community Feature State
  const [communityQuestions, setCommunityQuestions] = useState<CommunityQuestion[]>([]);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ 
      question: '', 
      role: '', 
      difficulty: 'Medium',
      isAnonymous: false 
  });
  const [currentUser, setCurrentUser] = useState<{name: string} | null>(null);

  useEffect(() => {
    const found = COMPANIES.find(c => c.id === id);
    if (found) {
      setCompany(found);
      setImgError(false);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  useEffect(() => {
      // Load user using centralized auth utility
      const user = getSession();
      setCurrentUser(user);

      // Load community questions for this company
      const storageKey = `intervue_community_questions_${id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
          setCommunityQuestions(JSON.parse(stored));
      } else {
          // Default mock data if empty
          setCommunityQuestions([
              {
                  id: 'c1',
                  question: "Can you explain the difference between processes and threads in the context of our OS?",
                  role: "System Engineer",
                  difficulty: "Medium",
                  author: "Alex Chen",
                  date: new Date().toISOString(),
                  isAnonymous: false
              },
              {
                  id: 'c2',
                  question: "Design a URL shortening service like Bit.ly.",
                  role: "Backend Developer",
                  difficulty: "Hard",
                  author: "Anonymous",
                  date: new Date(Date.now() - 86400000).toISOString(),
                  isAnonymous: true
              }
          ]);
      }
  }, [id]);

  const handlePractice = (questionText: string, role: string) => {
    navigate('/interview', {
      state: {
        role: role,
        company: company?.name,
        round: 'Technical',
        difficulty: 'Professional',
        duration: 15,
        jobDescription: `The candidate is practicing for a ${role} position at ${company?.name}. The specific question they want to practice is: "${questionText}". Please act as an interviewer from ${company?.name} and ask this question first, then follow up based on their response.`
      }
    });
  };

  const handleContributeSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newQuestion.question || !newQuestion.role) return;

      const authorName = newQuestion.isAnonymous ? "Anonymous User" : (currentUser?.name || "Anonymous User");

      const q: CommunityQuestion = {
          id: Date.now().toString(),
          question: newQuestion.question,
          role: newQuestion.role,
          difficulty: newQuestion.difficulty as any,
          author: authorName,
          date: new Date().toISOString(),
          isAnonymous: newQuestion.isAnonymous
      };

      const updated = [q, ...communityQuestions];
      setCommunityQuestions(updated);
      localStorage.setItem(`intervue_community_questions_${id}`, JSON.stringify(updated));
      
      setShowContributeModal(false);
      setNewQuestion({ question: '', role: '', difficulty: 'Medium', isAnonymous: false });
  };

  if (!company) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 relative">
      
      {/* --- HERO HEADER --- */}
      <div className="relative bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className={`absolute top-0 left-0 w-full h-1.5 ${company.brandColor}`}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-auto flex-shrink-0">
               <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-700 flex items-center justify-center p-6 overflow-hidden">
                  {imgError ? (
                      <div className="text-center flex flex-col items-center justify-center h-full w-full">
                          <span className="text-xl md:text-2xl font-black text-zinc-400 dark:text-zinc-500 tracking-tighter uppercase break-words leading-tight">
                              {company.name}
                          </span>
                      </div>
                  ) : (
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-full h-full object-contain"
                        onError={() => setImgError(true)} 
                      />
                  )}
               </div>
            </div>

            <div className="flex-1">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">{company.name}</h1>
                  <div className="flex items-center gap-3">
                     {company.socials.website && (
                       <a href={company.socials.website} target="_blank" rel="noreferrer" className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-purple-600 transition-all">
                         <Globe size={20} />
                       </a>
                     )}
                     {/* ... other socials ... */}
                  </div>
               </div>
               
               <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium mb-6">
                  <Briefcase size={16} />
                  <span>{company.location}</span>
               </div>

               <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed max-w-3xl">
                 {company.description}
               </p>

               <div className="mt-8 flex gap-4">
                  <a href={company.socials.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg font-bold transition-all">
                     Visit Career Page <ArrowRight size={18} />
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
         
         <div className="flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800/50 p-1 rounded-xl w-fit mb-10">
            <button 
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'questions' 
                ? 'bg-white dark:bg-zinc-900 text-purple-600 shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
               <MessageSquare size={18} /> Interview Questions
            </button>
            <button 
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'community' 
                ? 'bg-white dark:bg-zinc-900 text-purple-600 shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
               <Users size={18} /> User Created Practices
            </button>
         </div>

         {activeTab === 'questions' && (
            <div className="grid grid-cols-1 gap-6 animate-in slide-in-from-bottom-4 duration-500">
               {company.questions.map((q, idx) => (
                 <div key={q.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:shadow-xl hover:border-purple-500/30 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                       <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                             <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-500">
                                {idx + 1}
                             </span>
                             <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs font-bold rounded-full border border-purple-100 dark:border-purple-800">
                                   {q.role}
                                </span>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                                   q.difficulty === 'Hard' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 border-red-100 dark:border-red-800' :
                                   q.difficulty === 'Medium' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 border-orange-100 dark:border-orange-800' :
                                   'bg-green-50 dark:bg-green-900/20 text-green-600 border-green-100 dark:border-green-800'
                                }`}>
                                   {q.difficulty}
                                </span>
                             </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-snug group-hover:text-purple-600 transition-colors">
                             {q.question}
                          </h3>
                       </div>

                       <div className="flex-shrink-0 self-start">
                          <button 
                             onClick={() => handlePractice(q.question, q.role)}
                             className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                          >
                             <PlayCircle size={18} /> Practice Answer
                          </button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         )}

         {activeTab === 'community' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-5">
                       <div className="p-4 bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 rounded-full shadow-sm">
                           <Sparkles size={28} />
                       </div>
                       <div>
                           <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-1">Have you interviewed at {company.name}?</h3>
                           <p className="text-zinc-600 dark:text-zinc-400">Share your experience and help the community prepare better.</p>
                       </div>
                   </div>
                   <button 
                       onClick={() => setShowContributeModal(true)}
                       className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20 flex items-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5"
                   >
                       <Plus size={18} /> Contribute Question
                   </button>
               </div>

               <div className="grid grid-cols-1 gap-6">
                   {communityQuestions.length === 0 ? (
                       <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                           <Users size={48} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-4" />
                           <p className="text-zinc-500 font-medium">No community questions yet.</p>
                           <p className="text-sm text-zinc-400">Be the first one to contribute!</p>
                       </div>
                   ) : (
                       communityQuestions.map((q) => (
                           <div key={q.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-sm hover:shadow-lg group">
                               <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                   <div className="flex-1">
                                       <div className="flex items-center gap-3 mb-3">
                                           <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${q.isAnonymous ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500' : 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'}`}>
                                               {q.isAnonymous ? <EyeOff size={12} /> : <User size={12} />}
                                               <span>Contributed by {q.author}</span>
                                           </div>
                                           <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                           <span className="text-xs text-zinc-500">{new Date(q.date).toLocaleDateString()}</span>
                                       </div>
                                       
                                       <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 leading-snug">
                                           "{q.question}"
                                       </h3>
                                       
                                       <div className="flex flex-wrap gap-2">
                                           <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-md border border-blue-100 dark:border-blue-800">
                                               {q.role}
                                           </span>
                                           <span className={`px-3 py-1 text-xs font-bold rounded-md border ${
                                               q.difficulty === 'Hard' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' : 
                                               q.difficulty === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800' :
                                               'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                                           }`}>
                                               {q.difficulty}
                                           </span>
                                       </div>
                                   </div>
                                   
                                   <div className="flex-shrink-0 self-center md:self-start">
                                       <button 
                                           onClick={() => handlePractice(q.question, q.role)}
                                           className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white rounded-lg font-bold text-sm transition-all shadow-md flex items-center gap-2"
                                       >
                                           <PlayCircle size={16} /> Start Practice
                                       </button>
                                   </div>
                               </div>
                           </div>
                       ))
                   )}
               </div>
            </div>
         )}

      </div>

      {/* --- CONTRIBUTE MODAL --- */}
      {showContributeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
                  <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Contribute a Question</h3>
                      <button onClick={() => setShowContributeModal(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                          <X size={24} />
                      </button>
                  </div>
                  
                  <form onSubmit={handleContributeSubmit} className="p-6 space-y-6">
                      <div>
                          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Question Text</label>
                          <textarea 
                              required
                              rows={4}
                              placeholder="e.g. What is the difference between a process and a thread?"
                              value={newQuestion.question}
                              onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-all"
                          />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Role / Interview Type</label>
                              <input 
                                  type="text"
                                  required
                                  placeholder="e.g. SDE-2, HR Round"
                                  value={newQuestion.role}
                                  onChange={(e) => setNewQuestion({...newQuestion, role: e.target.value})}
                                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Difficulty</label>
                              <select 
                                  value={newQuestion.difficulty}
                                  onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
                                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                              >
                                  <option value="Easy">Easy</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Hard">Hard</option>
                              </select>
                          </div>
                      </div>

                      {/* Author Selection - Named or Anonymous */}
                      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg flex flex-col gap-3">
                          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Publish As</label>
                          <div className="flex items-center gap-6">
                              <label className="flex items-center gap-2 cursor-pointer group">
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${!newQuestion.isAnonymous ? 'border-purple-600 bg-purple-600' : 'border-zinc-300 dark:border-zinc-600'}`}>
                                      {!newQuestion.isAnonymous && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                  </div>
                                  <input type="radio" className="hidden" checked={!newQuestion.isAnonymous} onChange={() => setNewQuestion({...newQuestion, isAnonymous: false})} />
                                  <span className={`text-sm ${!newQuestion.isAnonymous ? 'text-zinc-900 dark:text-white font-medium' : 'text-zinc-500'}`}>
                                      {currentUser ? currentUser.name : "My Name"}
                                  </span>
                              </label>

                              <label className="flex items-center gap-2 cursor-pointer group">
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${newQuestion.isAnonymous ? 'border-purple-600 bg-purple-600' : 'border-zinc-300 dark:border-zinc-600'}`}>
                                      {newQuestion.isAnonymous && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                  </div>
                                  <input type="radio" className="hidden" checked={newQuestion.isAnonymous} onChange={() => setNewQuestion({...newQuestion, isAnonymous: true})} />
                                  <span className={`text-sm ${newQuestion.isAnonymous ? 'text-zinc-900 dark:text-white font-medium' : 'text-zinc-500'}`}>
                                      Anonymous User
                                  </span>
                              </label>
                          </div>
                          
                          <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                              <CheckCircle size={12} className="text-green-500" />
                              {newQuestion.isAnonymous 
                                  ? "Your name will be hidden from the community." 
                                  : `Your contribution will be attributed to ${currentUser ? currentUser.name : "you"}.`
                              }
                          </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                          <button 
                              type="button"
                              onClick={() => setShowContributeModal(false)}
                              className="flex-1 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit"
                              className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-purple-500/20"
                          >
                              Submit Question
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
};
