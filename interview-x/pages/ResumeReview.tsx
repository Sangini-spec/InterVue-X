
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';
import { 
  Upload, FileText, Loader2, CheckCircle, 
  XCircle, Lightbulb, 
  ArrowRight, Edit2, Eye, ArrowLeft
} from 'lucide-react';

const API_KEY = process.env.API_KEY || '';
const MODEL_NAME = 'gemini-2.5-flash';

interface AnalysisResult {
  score: number;
  isAtsFriendly: boolean;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

interface Template {
  id: string;
  name: string;
  image: string;
  description: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'academic',
    name: 'Academic (Overleaf)',
    description: 'Standard academic layout. Perfect for researchers and PhDs.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, serif-based layout. Best for banking, law, and corporate roles.',
    image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'modern',
    name: 'Modern Sidebar',
    description: 'Two-column layout with a sidebar. Great for tech and startups.',
    image: 'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Bold header with distinct sections. Ideal for design and marketing.',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'modern', // Reuse modern logic
    name: 'Tech Minimal',
    description: 'Optimized for technical skills and projects. No fluff.',
    image: 'https://images.unsplash.com/photo-1586282391129-76a6df840fd0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'creative', // Reuse creative logic
    name: 'Startup',
    description: 'Versatile and energetic layout for fast-paced roles.',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600'
  }
];

export const ResumeReview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [textData, setTextData] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (location.state) {
        if (location.state.role) setRole(location.state.role);
        if (location.state.jobDescription) setJobDescription(location.state.jobDescription);
    }
  }, [location.state]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
      setTextData(''); 
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleAnalyze = async () => {
    if ((!file && !textData) || !role) {
      alert("Please provide a resume and a target role.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      let contents: any = { role: "user", parts: [] };
      
      const jobContext = jobDescription ? `\n\nSpecific Job Description to Match:\n${jobDescription}` : '';

      const systemPrompt = `
      You are an expert ATS (Applicant Tracking System) and Hiring Manager. 
      Your task is to analyze the provided resume against the target role: "${role}".
      ${jobContext}
      
      Evaluate based on:
      1. Keyword matching.
      2. Quantifiable achievements.
      3. Formatting (ATS friendliness).
      4. Relevance to the role ${jobDescription ? 'and provided job description' : ''}.

      Return the response in strictly Valid JSON format with the following schema:
      {
        "score": number (0-100),
        "isAtsFriendly": boolean,
        "summary": "string (brief overview)",
        "strengths": ["string", "string"],
        "weaknesses": ["string", "string"],
        "suggestions": ["string", "string"]
      }
      `;

      contents.parts.push({ text: systemPrompt });

      if (file) {
        if (file.type.startsWith('image/')) {
           const base64Data = await fileToBase64(file);
           const cleanBase64 = base64Data.split(',')[1];
           contents.parts.push({
               inlineData: {
                   mimeType: file.type,
                   data: cleanBase64
               }
           });
        } else {
           const text = await file.text();
           contents.parts.push({ text: `Resume Content:\n${text}` });
        }
      } else {
         contents.parts.push({ text: `Resume Content:\n${textData}` });
      }

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: [contents],
        config: {
            responseMimeType: "application/json"
        }
      });

      const jsonText = response.text;
      const parsedResult = JSON.parse(jsonText);
      setResult(parsedResult);

    } catch (error) {
      console.error("Analysis failed", error);
      alert("Analysis failed. Please try again. If uploading a PDF, try converting to Image or copy-pasting text.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUseTemplate = (templateId: string) => {
      // Pass the ID to the builder page
      navigate('/resume-builder', { state: { templateId } });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto">
        
        <button 
            onClick={() => navigate(-1)} 
            className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
            <ArrowLeft size={20} /> Back
        </button>

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-3">AI Resume Review</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Get instant feedback on your resume's ATS compatibility and content quality, tailored for your target role.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* LEFT: Input Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">1. Target Role</h2>
                <input 
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Product Manager, Software Engineer..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                {jobDescription && (
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <CheckCircle size={10} /> Analyzing against specific JD
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">2. Upload Resume</h2>
                
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center relative hover:border-purple-500 transition-colors bg-zinc-50 dark:bg-zinc-950/50">
                    <input 
                        type="file" 
                        accept=".txt,.md,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center pointer-events-none">
                        <Upload size={32} className="text-zinc-400 mb-3" />
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                           {file ? file.name : "Click or Drag to Upload"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">Supports Images (PNG/JPG) or Text files</p>
                    </div>
                </div>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or Paste Text</span>
                  </div>
                </div>

                <textarea 
                    value={textData}
                    onChange={(e) => { setTextData(e.target.value); setFile(null); }}
                    placeholder="Paste your resume content here..."
                    className="w-full h-40 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                />

                <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !role || (!file && !textData)}
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
                >
                    {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
                    Analyze Resume
                </button>
            </div>
          </div>

          {/* RIGHT: Results Section */}
          <div className="lg:col-span-7">
             {!result ? (
                 <div className="h-full bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-zinc-400 p-8 min-h-[400px]">
                     <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                         <Loader2 size={32} className={`text-zinc-400 ${isAnalyzing ? 'animate-spin text-purple-500' : ''}`} />
                     </div>
                     <p className="font-medium">{isAnalyzing ? 'AI is analyzing your profile...' : 'Analysis results will appear here'}</p>
                 </div>
             ) : (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                     
                     {/* Score Card */}
                     <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg flex flex-col md:flex-row items-center gap-8">
                         <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                             <svg className="w-full h-full transform -rotate-90">
                                 <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-zinc-100 dark:text-zinc-800" />
                                 <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={351} strokeDashoffset={351 - (351 * result.score) / 100} className={`${result.score > 80 ? 'text-green-500' : result.score > 60 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} />
                             </svg>
                             <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-zinc-900 dark:text-white">{result.score}</span>
                                <span className="text-xs text-zinc-500">ATS Score</span>
                             </div>
                         </div>
                         <div className="flex-1">
                             <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Analysis Summary</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.isAtsFriendly ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {result.isAtsFriendly ? 'ATS Friendly' : 'Needs Optimization'}
                                </span>
                             </div>
                             <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                {result.summary}
                             </p>
                         </div>
                     </div>

                     {/* Details Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-100 dark:border-green-900/20">
                            <h4 className="font-bold text-green-800 dark:text-green-400 mb-3 flex items-center gap-2"><CheckCircle size={18}/> Strengths</h4>
                            <ul className="space-y-2">
                                {result.strengths.map((s, i) => (
                                    <li key={i} className="text-sm text-green-900 dark:text-green-200 flex gap-2">
                                        <span className="mt-1.5 w-1 h-1 bg-green-500 rounded-full shrink-0" /> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-900/20">
                            <h4 className="font-bold text-red-800 dark:text-red-400 mb-3 flex items-center gap-2"><XCircle size={18}/> Weaknesses & Mistakes</h4>
                            <ul className="space-y-2">
                                {result.weaknesses.map((s, i) => (
                                    <li key={i} className="text-sm text-red-900 dark:text-red-200 flex gap-2">
                                        <span className="mt-1.5 w-1 h-1 bg-red-500 rounded-full shrink-0" /> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                     </div>

                     <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-900/20">
                        <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-3 flex items-center gap-2"><Lightbulb size={18}/> Suggested Improvements</h4>
                        <ul className="space-y-2">
                            {result.suggestions.map((s, i) => (
                                <li key={i} className="text-sm text-blue-900 dark:text-blue-200 flex gap-2">
                                    <ArrowRight size={14} className="mt-1 shrink-0 text-blue-500" /> {s}
                                </li>
                            ))}
                        </ul>
                     </div>

                 </div>
             )}
          </div>
        </div>

        {/* Templates Section */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 text-center">Resume Templates</h2>
            <p className="text-center text-zinc-500 mb-10">Professional, ATS-friendly templates to get you hired.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {TEMPLATES.map((template, idx) => (
                    <div key={idx} className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                            <img src={template.image} alt={template.name} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button className="p-2 bg-white text-zinc-900 rounded-full hover:scale-110 transition-transform" title="Preview">
                                    <Eye size={20} />
                                </button>
                                <button 
                                    onClick={() => handleUseTemplate(template.id)}
                                    className="p-2 bg-purple-600 text-white rounded-full hover:scale-110 transition-transform" 
                                    title="Use This Template"
                                >
                                    <Edit2 size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-lg mb-1">{template.name}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{template.description}</p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleUseTemplate(template.id)}
                                    className="flex-1 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Use Template
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};
