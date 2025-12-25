
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ChevronRight, ChevronLeft, 
  Plus, HelpCircle, Check, Trash2, 
  Briefcase, User, DollarSign, GraduationCap 
} from 'lucide-react';
import { Footer } from '../components/Footer';

export const CreateInterview: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    practiceName: '',
    role: '',
    round: '',
    company: '',
    questions: [] as string[],
    isAnonymous: false,
    isDynamic: false
  });

  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleNext = () => {
    if (step === 1) {
       // Basic validation
       if (!formData.practiceName || !formData.role || !formData.round) {
           alert("Please fill in all required fields.");
           return;
       }
       setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleAddQuestion = (q: string) => {
      if (q.trim() && !formData.questions.includes(q.trim())) {
          setFormData(prev => ({ ...prev, questions: [...prev.questions, q.trim()] }));
          setCurrentQuestion('');
      }
  };

  const handleRemoveQuestion = (index: number) => {
      setFormData(prev => ({ 
          ...prev, 
          questions: prev.questions.filter((_, i) => i !== index) 
      }));
  };

  const handleCreate = () => {
      if (formData.questions.length < 2) {
          alert("Please add at least 2 questions to create a practice session.");
          return;
      }
      
      // Here you would typically save the interview to the backend
      console.log("Creating Interview:", formData);
      alert("Interview Practice Created Successfully!");
      navigate('/dashboard'); 
  };

  const suggestedQuestions = [
      "Tell me about yourself.",
      "Why do you want to work here?",
      "What are your strengths and weaknesses?",
      "Tell me about a time you faced a challenge at work and how you handled it.",
      "Where do you see yourself in five years?"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="flex-1 px-6 py-8">
        <div className="max-w-[1600px] mx-auto">
            
            <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6 text-sm font-medium"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Create Your Interviews</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">Fill the details below to create your own custom interview practice</p>

            {/* Main Form Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
                
                {/* Stepper */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center">
                        <div className={`flex items-center gap-2 ${step === 1 ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-purple-600 dark:text-purple-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 1 ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'}`}>1</div>
                            <span>Interview Details</span>
                        </div>
                        <div className="w-16 h-px bg-zinc-300 dark:bg-zinc-700 mx-4"></div>
                        <div className={`flex items-center gap-2 ${step === 2 ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-zinc-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 2 ? 'bg-purple-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>2</div>
                            <span>Add Questions</span>
                        </div>
                    </div>
                </div>

                {/* Step 1: Details */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Practice Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Practice Name" 
                                    value={formData.practiceName}
                                    onChange={(e) => setFormData({...formData, practiceName: e.target.value})}
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Select or Add Role</label>
                                <div className="relative">
                                    <select 
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer text-sm"
                                    >
                                        <option value="" disabled>Select or Add Role</option>
                                        <option value="Software Engineer">Software Engineer</option>
                                        <option value="Product Manager">Product Manager</option>
                                        <option value="Data Scientist">Data Scientist</option>
                                        <option value="Designer">Designer</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Select Round</label>
                                <div className="relative">
                                    <select 
                                        value={formData.round}
                                        onChange={(e) => setFormData({...formData, round: e.target.value})}
                                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer text-sm"
                                    >
                                        <option value="" disabled>Select Round</option>
                                        <option value="HR Round">HR Round</option>
                                        <option value="Technical Round">Technical Round</option>
                                        <option value="Managerial Round">Managerial Round</option>
                                        <option value="System Design">System Design</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Add Channel <HelpCircle size={14} className="inline ml-1 text-purple-600" /></label>
                                    <button className="text-xs font-bold text-zinc-900 dark:text-white border-b border-black dark:border-white uppercase tracking-wider hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-600 dark:hover:border-purple-400 transition-colors">ADD CHANNEL</button>
                                </div>
                                <div className="h-[50px]"></div> 
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Select or Add Company (Optional)</label>
                                <div className="relative">
                                    <select 
                                        value={formData.company}
                                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer text-sm"
                                    >
                                        <option value="">Select or Add Company</option>
                                        <option value="Google">Google</option>
                                        <option value="Microsoft">Microsoft</option>
                                        <option value="Amazon">Amazon</option>
                                        <option value="Facebook">Facebook</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end">
                            <button 
                                onClick={handleNext}
                                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                            >
                                NEXT <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Questions */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left: Input */}
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Add Questions</label>
                                <div className="mb-2">
                                    <input 
                                        type="text" 
                                        placeholder="Type a question and press Enter..." 
                                        value={currentQuestion}
                                        onChange={(e) => setCurrentQuestion(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddQuestion(currentQuestion);
                                            }
                                        }}
                                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                                    />
                                </div>
                                <p className="text-xs text-zinc-500 mb-6">Add at least 2 questions to take full advantage of the entire interview practice and interview analytics.</p>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Suggested Questions</h4>
                                    <div className="flex flex-col gap-2">
                                        {suggestedQuestions.map((q, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => handleAddQuestion(q)}
                                                className="text-left px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 transition-colors flex items-center gap-2 group"
                                            >
                                                <Plus size={16} className="text-purple-600 group-hover:scale-110 transition-transform" />
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Options & Review */}
                            <div className="flex flex-col h-full">
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 mb-6 flex-1">
                                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Your Questions ({formData.questions.length})</h4>
                                    
                                    {formData.questions.length === 0 ? (
                                        <div className="text-zinc-500 text-sm italic text-center py-8">
                                            No questions added yet. Start adding!
                                        </div>
                                    ) : (
                                        <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                            {formData.questions.map((q, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                                    <span className="font-bold text-purple-600 mt-0.5">{idx + 1}.</span>
                                                    <span className="flex-1">{q}</span>
                                                    <button onClick={() => handleRemoveQuestion(idx)} className="text-zinc-400 hover:text-red-500 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mt-0.5 ${formData.isAnonymous ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600'}`}>
                                            {formData.isAnonymous && <Check size={14} />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={formData.isAnonymous} onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})} />
                                        <div>
                                            <span className="font-bold text-zinc-900 dark:text-white text-sm">Add my practice as <span className="text-purple-600">Anonymous</span></span>
                                            <p className="text-xs text-zinc-500 mt-0.5">Check this box to keep your practice interview private. Your name and details will not be shown on the platform.</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mt-0.5 ${formData.isDynamic ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600'}`}>
                                            {formData.isDynamic && <Check size={14} />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={formData.isDynamic} onChange={(e) => setFormData({...formData, isDynamic: e.target.checked})} />
                                        <div>
                                            <span className="font-bold text-zinc-900 dark:text-white text-sm">Dynamic Follow Up Questions</span>
                                            <p className="text-xs text-zinc-500 mt-0.5">Check this box to enable dynamic follow-up questions after each response, tailored to your answers.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <button 
                                onClick={handlePrev}
                                className="px-8 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-lg transition-colors flex items-center gap-2 uppercase tracking-wide text-sm"
                            >
                                PREV
                            </button>
                            <button 
                                onClick={handleCreate}
                                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2 uppercase tracking-wide text-sm shadow-lg shadow-purple-500/20"
                            >
                                CREATE INTERVIEW PRACTICE
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Benefits Section */}
            <div className="bg-purple-100 dark:bg-purple-900/20 rounded-2xl p-10 text-center border border-purple-200 dark:border-purple-900/30 mb-16">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Benefits of Create Your Interviews</h2>
                <p className="text-zinc-700 dark:text-zinc-300 max-w-4xl mx-auto leading-relaxed">
                    Create Your Interviews feature empowers users to craft bespoke interview simulations using custom questions. Leverage advanced AI to generate dynamic follow-ups and realistic scenarios. Receive comprehensive analytics and actionable feedback on communication, expertise, and presentation. Tailor your practice sessions to ensure focused improvement and confidence for recruitment and professional growth.
                </p>
            </div>

            {/* Features Carousel Section (Simplified Grid) */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-10">Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard 
                        title="Job Description-Based Interviews"
                        image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400"
                        icon={<Briefcase className="text-purple-600" />}
                    />
                    <FeatureCard 
                        title="Performance Review"
                        image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
                        icon={<User className="text-blue-600" />}
                    />
                    <FeatureCard 
                        title="Salary Negotiation"
                        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400"
                        icon={<DollarSign className="text-green-600" />}
                    />
                    <FeatureCard 
                        title="MBA Admission"
                        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400"
                        icon={<GraduationCap className="text-orange-600" />}
                    />
                </div>
            </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, image, icon }: { title: string, image: string, icon: React.ReactNode }) => (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer">
        <div className="h-40 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        </div>
        <div className="p-6 text-center">
            <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto -mt-12 relative z-10 border-4 border-white dark:border-zinc-900 shadow-sm">
                {icon}
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-white mt-3 group-hover:text-purple-600 transition-colors">{title}</h3>
        </div>
    </div>
);
