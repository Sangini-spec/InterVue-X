
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle, ChevronDown, Star, 
  ArrowRight, Sparkles, Building2, 
  Trophy, FileText, Zap, X, Upload,
  Clock, Mic, Video, Info, FileCheck,
  BarChart3, PieChart, MessageSquare, 
  Target, ShieldCheck, Users, BrainCircuit
} from 'lucide-react';
import { Footer } from '../components/Footer';

const StepCard = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center hover:shadow-lg transition-all duration-300 group">
    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
      {number}
    </div>
    <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
    <div className="flex text-purple-500 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-zinc-700 dark:text-zinc-300 italic mb-6">"{quote}"</p>
    <div>
      <div className="font-bold text-zinc-900 dark:text-white">{author}</div>
      <div className="text-xs text-zinc-500">{role}</div>
    </div>
  </div>
);

const FaqItem = ({ q, a }: { q: string, a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className="font-medium text-zinc-900 dark:text-white pr-8 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{q}</span>
                {isOpen ? <ChevronDown size={16} className="text-purple-600 shrink-0 rotate-180 transition-transform" /> : <ChevronDown size={16} className="text-zinc-400 shrink-0 group-hover:text-purple-600 transition-transform" />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{a}</p>
            </div>
        </div>
    );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Dashboard Selection State
  const [selectedType, setSelectedType] = useState('Job');
  const [selectedRole, setSelectedRole] = useState('Software Development Engineer');
  const [selectedRound, setSelectedRound] = useState('Coding');
  const [activeBenefit, setActiveBenefit] = useState(0);

  // Modal State
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Professional'>('Professional');
  const [duration, setDuration] = useState<5 | 15 | 30 | 60>(15);
  const [selectedInterviewer, setSelectedInterviewer] = useState<'emma' | 'john'>('emma');
  const [settings, setSettings] = useState({ audio: true, video: true });
  const [agreed, setAgreed] = useState(false);
  
  // Resume State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Success Toast State
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Check for login success message
  useEffect(() => {
    if (location.state?.loginSuccess) {
        setShowSuccessToast(true);
        const timer = setTimeout(() => setShowSuccessToast(false), 4000);
        window.history.replaceState({}, document.title);
        return () => clearTimeout(timer);
    }
  }, [location]);

  // Auto-rotate benefits
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeBenefit]);

  const benefits = [
    {
      id: 1,
      title: "Real-Time AI Interviewer",
      desc: "Experience ultra-realistic voice interviews with AI avatars that react, listen, and follow up just like human recruiters.",
      icon: <Video />,
      color: "from-purple-500 to-indigo-600",
      renderVisual: () => (
        <div className="w-full h-full flex flex-col relative rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800">
           {/* Header */}
           <div className="h-10 bg-zinc-800 flex items-center px-4 gap-2 border-b border-zinc-700">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <div className="ml-auto text-xs text-zinc-400 font-mono flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live Session
              </div>
           </div>
           {/* Main Video Area */}
           <div className="flex-1 relative bg-zinc-950 p-4 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-purple-500/30 p-1 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" 
                    alt="AI Avatar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute -bottom-2 right-4 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full border border-zinc-900">
                    Dr. Emma
                  </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 bg-zinc-800/80 backdrop-blur px-3 py-2 rounded-lg border border-zinc-700 max-w-[140px] animate-in slide-in-from-left duration-700 fade-in">
                  <div className="flex gap-2 mb-1">
                      <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                      <div className="w-1 h-3 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                  <div className="text-[10px] text-zinc-400">Listening...</div>
              </div>
           </div>
           {/* Controls */}
           <div className="h-16 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center gap-6">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400"><Mic size={18} /></div>
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/50"><Video size={20} /></div>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400"><MessageSquare size={18} /></div>
           </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Company Specific Prep",
      desc: "Practice with curated questions from top tech giants. Our AI simulates the specific tone and difficulty of companies like Google and Amazon.",
      icon: <Building2 />,
      color: "from-blue-500 to-cyan-600",
      renderVisual: () => (
        <div className="w-full h-full p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-950"></div>
            <div className="grid grid-cols-2 gap-4 relative z-10 h-full">
                {/* Company Cards */}
                {[
                    { name: 'Google', color: 'bg-blue-100 text-blue-600', icon: 'G' },
                    { name: 'Amazon', color: 'bg-orange-100 text-orange-600', icon: 'A' },
                    { name: 'Netflix', color: 'bg-red-100 text-red-600', icon: 'N' },
                    { name: 'Meta', color: 'bg-blue-100 text-blue-700', icon: 'M' }
                ].map((co, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-100 dark:border-zinc-700 flex flex-col justify-between transform transition-all duration-500 hover:scale-105">
                        <div className={`w-10 h-10 rounded-full ${co.color} dark:bg-zinc-700 dark:text-white flex items-center justify-center font-bold text-lg`}>
                            {co.icon}
                        </div>
                        <div>
                            <div className="text-xs text-zinc-400 mb-1">Target</div>
                            <div className="font-bold text-zinc-900 dark:text-white">{co.name}</div>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-3/4 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Overlay Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-xl border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 flex items-center gap-2 z-20 animate-bounce">
                <Target size={16} className="text-red-500" />
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">High Accuracy Match</span>
            </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Smart Resume Analysis",
      desc: "Upload your CV and let our AI act as a ruthless hiring manager. It spots gaps, suggests keywords, and grills you on your past projects.",
      icon: <FileText />,
      color: "from-pink-500 to-rose-600",
      renderVisual: () => (
        <div className="w-full h-full flex items-center justify-center p-6 relative bg-zinc-50 dark:bg-zinc-900/50">
             {/* Document */}
             <div className="w-48 bg-white dark:bg-zinc-800 shadow-2xl border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 transform -rotate-6 relative z-10">
                 <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-700 mb-4"></div>
                 <div className="space-y-2">
                     <div className="h-2 bg-zinc-100 dark:bg-zinc-700 w-full rounded"></div>
                     <div className="h-2 bg-zinc-100 dark:bg-zinc-700 w-3/4 rounded"></div>
                     <div className="h-2 bg-zinc-100 dark:bg-zinc-700 w-5/6 rounded"></div>
                 </div>
                 <div className="mt-6 space-y-2">
                     <div className="h-2 bg-zinc-100 dark:bg-zinc-700 w-full rounded"></div>
                     <div className="h-2 bg-zinc-100 dark:bg-zinc-700 w-full rounded"></div>
                 </div>
                 {/* Highlights */}
                 <div className="absolute top-16 right-2 w-4 h-4 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                    <X size={10} className="text-red-500" />
                 </div>
                 <div className="absolute bottom-8 left-2 w-4 h-4 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                    <CheckCircle size={10} className="text-green-500" />
                 </div>
             </div>

             {/* Analysis Card */}
             <div className="absolute bottom-8 right-8 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 z-20 max-w-[180px]">
                 <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-bold text-zinc-500">ATS Score</span>
                     <span className="text-sm font-bold text-green-600">85/100</span>
                 </div>
                 <div className="w-full bg-zinc-100 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                     <div className="h-full bg-green-500 w-[85%]"></div>
                 </div>
                 <div className="mt-3 text-[10px] text-zinc-400 flex items-center gap-1">
                    <Sparkles size={10} className="text-purple-500" /> AI Suggestions Ready
                 </div>
             </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Detailed Analytics",
      desc: "Get post-interview breakdowns on your technical accuracy, communication style, and filler words. Measure your growth over time.",
      icon: <BarChart3 />,
      color: "from-amber-500 to-orange-600",
      renderVisual: () => (
        <div className="w-full h-full p-8 flex flex-col justify-center relative bg-white dark:bg-zinc-950">
             <div className="grid grid-cols-2 gap-4 mb-4">
                 <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3 border border-zinc-100 dark:border-zinc-800">
                     <div className="text-xs text-zinc-500 mb-1">Tech Accuracy</div>
                     <div className="text-xl font-bold text-purple-600">92%</div>
                     <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 mt-2 rounded-full overflow-hidden">
                         <div className="h-full bg-purple-500 w-[92%]"></div>
                     </div>
                 </div>
                 <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3 border border-zinc-100 dark:border-zinc-800">
                     <div className="text-xs text-zinc-500 mb-1">Confidence</div>
                     <div className="text-xl font-bold text-amber-500">88%</div>
                     <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 mt-2 rounded-full overflow-hidden">
                         <div className="h-full bg-amber-500 w-[88%]"></div>
                     </div>
                 </div>
             </div>
             
             {/* Chart */}
             <div className="flex items-end justify-between h-32 gap-2 mt-2 px-2">
                 {[40, 65, 50, 80, 75, 90, 85].map((h, i) => (
                     <div key={i} className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-t-sm relative group overflow-hidden">
                         <div 
                            className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-pink-500 transition-all duration-1000 ease-out"
                            style={{ height: `${h}%` }}
                         ></div>
                     </div>
                 ))}
             </div>
             
             <div className="mt-2 flex justify-between text-[10px] text-zinc-400 px-2 font-mono uppercase">
                 <span>Mon</span>
                 <span>Tue</span>
                 <span>Wed</span>
                 <span>Thu</span>
                 <span>Fri</span>
                 <span>Sat</span>
                 <span>Sun</span>
             </div>
        </div>
      )
    }
  ];

  const handleInitialStart = () => {
    // Open the modal instead of navigating immediately
    setShowSetupModal(true);
  };

  const handleResumeClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      try {
        const text = await file.text();
        setResumeText(text);
      } catch (e) {
        console.warn("Could not read file text", e);
        setResumeText(""); // Fallback
      }
    }
  };

  const handleFinalStart = () => {
    if (!agreed) return;
    setShowSetupModal(false);
    navigate('/interview', {
      state: {
        role: selectedRole,
        round: selectedRound,
        difficulty,
        duration,
        interviewer: selectedInterviewer,
        settings,
        hasResume: !!resumeFile,
        resumeText: resumeText // Pass extracted content
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      
      {/* Toast Notification */}
      {showSuccessToast && (
         <div className="fixed top-24 right-6 z-50 bg-white dark:bg-zinc-900 border border-green-500 text-green-600 dark:text-green-400 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right fade-in duration-300">
             <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <CheckCircle size={24} />
             </div>
             <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Welcome back!</h4>
                <p className="text-xs opacity-90">You have successfully logged in.</p>
             </div>
             <button onClick={() => setShowSuccessToast(false)} className="ml-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <X size={18} />
             </button>
         </div>
      )}

      {/* --- HERO SECTION --- */}
      <div className="relative pt-20 pb-24 px-6 overflow-visible">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-500/10 dark:bg-purple-900/20 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-[1600px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-medium mb-6 backdrop-blur-sm shadow-sm">
            <Sparkles size={12} className="text-purple-500 dark:text-purple-400" />
            <span>AI-Powered Interview Prep</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
            Unlock Your Ultimate <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-500 dark:to-purple-400">Career Potential with AI</span>
          </h1>
          
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Practice with realistic AI avatars, get instant feedback, and land your dream job faster than ever.
          </p>

          {/* --- SELECTION BAR --- */}
          <div className="max-w-5xl mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 flex flex-col md:flex-row gap-4 items-center relative z-40">
            
            {/* 1. Job Type */}
            <div className="w-full relative group">
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-purple-700 dark:text-purple-400 font-semibold rounded-lg px-4 py-3 pr-10 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="Job">Job</option>
                  <option value="Internship">Internship</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Separator for desktop */}
            <div className="hidden md:block w-px h-10 bg-zinc-200 dark:bg-zinc-800 self-end mb-2"></div>

            {/* 2. Target Role (Search Position) */}
            <div className="w-full relative">
               <div className="relative">
                <select 
                  className="w-full appearance-none bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 rounded-lg px-4 py-3 pr-10 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="" disabled>Search Position</option>
                  <optgroup label="Engineering">
                    <option>Software Development Engineer</option>
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>Full Stack Developer</option>
                    <option>MERN Stack Developer</option>
                    <option>Core Java Developer</option>
                    <option>Android Developer</option>
                    <option>Data Scientist</option>
                    <option>Data Engineer</option>
                    <option>Cybersecurity Analyst</option>
                    <option>Mechanical Engineer</option>
                  </optgroup>
                  <optgroup label="Business & Management">
                    <option>Product Manager</option>
                    <option>Project Manager</option>
                    <option>Business Analyst</option>
                    <option>Digital Marketing Specialist</option>
                    <option>HR Manager</option>
                    <option>Sales Executive</option>
                    <option>Customer Service Representative</option>
                  </optgroup>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Separator for desktop */}
            <div className="hidden md:block w-px h-10 bg-zinc-200 dark:bg-zinc-800 self-end mb-2"></div>

            {/* 3. Interview Round */}
            <div className="w-full relative">
               <div className="relative">
                <select 
                  className="w-full appearance-none bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 rounded-lg px-4 py-3 pr-10 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
                  value={selectedRound}
                  onChange={(e) => setSelectedRound(e.target.value)}
                >
                  <option value="" disabled>Select Round</option>
                  <option>Warm Up</option>
                  <option>Coding</option>
                  <option>Role Related</option>
                  <option>Behavioral</option>
                  <option>System Design</option>
                  <option>Managerial</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full md:w-auto">
              <button 
                onClick={handleInitialStart}
                className="w-full md:w-auto whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-purple-500/20 dark:shadow-purple-900/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                START PRACTICE
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500 flex items-center justify-center gap-2">
            <CheckCircle size={14} className="text-green-600 dark:text-green-500" /> Free to start
            <span className="mx-2">•</span>
            <CheckCircle size={14} className="text-green-600 dark:text-green-500" /> No credit card required
          </p>
        </div>
      </div>

      {/* --- REVAMPED BENEFITS SECTION --- */}
      <div className="py-24 px-6 bg-white dark:bg-zinc-950/50 border-y border-zinc-100 dark:border-zinc-900 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-purple-500/5 to-transparent rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

         <div className="max-w-[1600px] mx-auto">
             <div className="text-center mb-20">
                 <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Why Choose InterVue X?</h2>
                 <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    We combine advanced AI models with industry-standard evaluation metrics to give you the competitive edge.
                 </p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                 {/* Left: Interactive Navigation */}
                 <div className="lg:col-span-5 flex flex-col gap-6">
                     {benefits.map((item, index) => (
                         <div 
                            key={item.id}
                            onClick={() => setActiveBenefit(index)}
                            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 relative group ${
                                activeBenefit === index 
                                ? 'bg-zinc-50 dark:bg-zinc-900 shadow-lg scale-100' 
                                : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/50 scale-95 opacity-70 hover:opacity-100'
                            }`}
                         >
                            {/* Progress Bar for Active Item */}
                            {activeBenefit === index && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-2xl"></div>
                            )}
                            {activeBenefit === index && (
                                <div className="absolute bottom-0 left-0 h-1 bg-purple-500/20 w-full rounded-b-2xl overflow-hidden">
                                     <div className="h-full bg-purple-500 animate-[progress_5s_linear_infinite] origin-left"></div>
                                </div>
                            )}

                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                                    activeBenefit === index 
                                    ? `bg-gradient-to-br ${item.color} text-white` 
                                    : 'bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:scale-110'
                                }`}>
                                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold text-lg mb-2 transition-colors ${
                                        activeBenefit === index ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'
                                    }`}>
                                        {item.title}
                                    </h3>
                                    <p className={`text-base leading-relaxed transition-colors ${
                                        activeBenefit === index ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-500 dark:text-zinc-500'
                                    }`}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                         </div>
                     ))}
                 </div>

                 {/* Right: Dynamic Visual Display */}
                 <div className="lg:col-span-7 h-[500px] relative perspective-1000">
                     {benefits.map((item, index) => (
                         <div 
                            key={item.id}
                            className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                                activeBenefit === index 
                                ? 'opacity-100 translate-x-0 z-20 scale-100 rotate-y-0' 
                                : activeBenefit < index 
                                    ? 'opacity-0 translate-y-12 z-0 scale-95' 
                                    : 'opacity-0 -translate-y-12 z-0 scale-95'
                            }`}
                         >
                             <div className="w-full h-full bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
                                 {/* Background Glow */}
                                 <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br ${item.color} opacity-10 blur-[100px] rounded-full`}></div>
                                 
                                 {/* Render specific visual for the benefit */}
                                 <div className="w-full h-full relative z-10">
                                    {item.renderVisual()}
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         </div>
      </div>

      {/* --- HOW IT WORKS --- */}
      <div className="py-24 bg-zinc-50 dark:bg-zinc-900/30 px-6">
         <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">How it Works?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StepCard number="1" title="Select Role" desc="Choose your desired role and other interview details to start practicing." />
                <StepCard number="2" title="Practice Live" desc="Practice in real-time with live followup questions and voice interaction." />
                <StepCard number="3" title="Get Feedback" desc="Get actionable feedback based on industry evaluation parameters and scoring." />
                <StepCard number="4" title="Improve" desc="Track and improve your performance through mock practices and analytics." />
            </div>
         </div>
      </div>

      {/* --- TESTIMONIALS --- */}
      <div className="py-24 px-6 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Join Our Community of Happy Users</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TestimonialCard 
                    quote="It was an awesome experience. InterVue X is the best tool for interview prep I've found."
                    author="Akash J"
                    role="Aerospace Engineer"
                />
                 <TestimonialCard 
                    quote="good, i love the conversation between interviewer and me. very natural."
                    author="Rudhra R"
                    role="QA Analyst"
                />
                 <TestimonialCard 
                    quote="its great through this mock interview and feedback I came to know my weak areas."
                    author="Omkar"
                    role="App Developer"
                />
            </div>
        </div>
      </div>

      {/* --- FAQ --- */}
      <div className="py-24 bg-zinc-50 dark:bg-zinc-900/50 px-6 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">FAQs</h2>
            </div>

            <div className="space-y-4">
                <FaqItem q="Are the mock interview questions curated?" a="Yes, our AI generates questions based on real interview experiences at top tech companies." />
                <FaqItem q="Is my data secure when using the platform?" a="Absolutely. We do not store your video or audio recordings permanently. Your privacy is our priority." />
                <FaqItem q="Can I practice for non-technical roles?" a="Yes, we support Product Management, Marketing, HR, and various other non-tech roles." />
            </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <Footer />

      {/* --- INTERVIEW SETUP MODAL --- */}
      {showSetupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur z-10">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Interview Details</h3>
              <button onClick={() => setShowSetupModal(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              
              {/* Context Bar */}
              <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-white text-lg">{selectedRole}</h4>
                <p className="text-purple-600 dark:text-purple-400 font-medium">{selectedRound}</p>
              </div>

              {/* Resume Upload */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-zinc-900 dark:text-white">Resume Based Interview: (Optional)</label>
                  <div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept=".pdf,.doc,.docx,.txt,.md"
                      onChange={handleFileChange}
                    />
                    <button 
                      onClick={handleResumeClick}
                      className={`${
                        resumeFile 
                        ? 'bg-green-600 hover:bg-green-500' 
                        : 'bg-purple-600 hover:bg-purple-500'
                      } text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2`}
                    >
                      {resumeFile ? <FileCheck size={16} /> : <Upload size={16} />} 
                      {resumeFile ? 'Resume Uploaded' : 'Upload Resume'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-zinc-500">Get interview questions personalized to your resume.</p>
                    {resumeFile && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium truncate max-w-[200px]">
                            {resumeFile.name}
                        </span>
                    )}
                </div>
              </div>

              {/* Round & Difficulty Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">Select Round <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                     {['Warm Up', 'Coding', 'Role Related', 'Behavioral'].map(round => (
                       <button
                         key={round}
                         onClick={() => setSelectedRound(round)}
                         className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors border ${
                           selectedRound === round 
                           ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-300' 
                           : 'bg-zinc-50 dark:bg-zinc-800 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                         }`}
                       >
                         {round}
                         <div className="text-[10px] uppercase mt-1 opacity-60">
                           {round === 'Coding' ? 'Programming' : round === 'Behavioral' ? 'HR' : round === 'Warm Up' ? 'Non Technical' : 'Technical'}
                         </div>
                       </button>
                     ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">Difficulty Level <span className="text-red-500">*</span></label>
                  <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                    {['Beginner', 'Professional'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level as any)}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                          difficulty === level 
                          ? 'bg-purple-600 text-white shadow-sm' 
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Info Box */}
              <div className="border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg flex items-start gap-3">
                <Info className="text-orange-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <h5 className="font-bold text-orange-700 dark:text-orange-400 text-sm mb-1">{selectedRound}</h5>
                  <p className="text-xs text-orange-600 dark:text-orange-300/80">
                    {selectedRound === 'Coding' 
                      ? 'Programming and algorithm questions with compiler and editor, relevant to your expertise.'
                      : 'Comprehensive questions to assess your understanding and depth in the selected field.'}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div>
                 <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">Interview Duration <span className="text-red-500">*</span></label>
                 <div className="flex gap-3">
                    {[5, 15, 30, 60].map(mins => (
                      <button
                        key={mins}
                        onClick={() => setDuration(mins as any)}
                        className={`px-6 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2 ${
                          duration === mins
                          ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-300'
                          : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-purple-300'
                        }`}
                      >
                        {mins} mins {mins > 5 && mins < 60 && <span className="text-amber-500 text-xs">👑</span>}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Select Interviewer */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">Select Your Interviewer <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Female Option */}
                  <div 
                    onClick={() => setSelectedInterviewer('emma')}
                    className={`cursor-pointer border rounded-xl p-3 flex items-center gap-3 transition-all ${
                      selectedInterviewer === 'emma'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10 ring-1 ring-purple-500'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-purple-300'
                    }`}
                  >
                     <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" alt="Emma" className="w-full h-full object-cover" />
                     </div>
                     <div>
                       <div className="font-bold text-sm text-zinc-900 dark:text-white">Emma</div>
                       <div className="text-[10px] text-zinc-500">US English</div>
                     </div>
                  </div>

                  {/* Male Option */}
                  <div 
                    onClick={() => setSelectedInterviewer('john')}
                    className={`cursor-pointer border rounded-xl p-3 flex items-center gap-3 transition-all ${
                      selectedInterviewer === 'john'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10 ring-1 ring-purple-500'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-purple-300'
                    }`}
                  >
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" alt="John" className="w-full h-full object-cover" />
                     </div>
                     <div>
                       <div className="font-bold text-sm text-zinc-900 dark:text-white">John</div>
                       <div className="text-[10px] text-zinc-500">US English</div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">Practice Settings <span className="text-red-500">*</span></label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${settings.audio ? 'bg-red-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                      {settings.audio && <CheckCircle size={14} />}
                    </div>
                    <input type="checkbox" className="hidden" checked={settings.audio} onChange={() => setSettings(s => ({...s, audio: !s.audio}))} />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Audio</span>
                  </label>

                   <label className="flex items-center gap-2 cursor-pointer">
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${settings.video ? 'bg-red-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                      {settings.video && <CheckCircle size={14} />}
                    </div>
                    <input type="checkbox" className="hidden" checked={settings.video} onChange={() => setSettings(s => ({...s, video: !s.video}))} />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Video</span>
                  </label>
                </div>
                <p className="text-[10px] text-zinc-400 mt-2">Note: Video will be deleted after 30 mins.</p>
              </div>

              {/* Agreement */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                 <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      I agree with the <span className="text-purple-600 hover:underline">terms and conditions</span>.
                    </span>
                 </label>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end gap-3 sticky bottom-0">
               <button 
                 onClick={() => setShowSetupModal(false)}
                 className="px-6 py-3 rounded-lg font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
               >
                 CANCEL
               </button>
               <button 
                 onClick={handleFinalStart}
                 disabled={!agreed}
                 className="px-8 py-3 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
               >
                 START PRACTICE
               </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
