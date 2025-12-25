
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export const JobDescriptionInterview: React.FC = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [interviewType, setInterviewType] = useState('Internship');
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Try to read text if possible to populate the JD field or internal context
      try {
        const text = await selectedFile.text();
        // A naive check to see if it's text-readable content
        if (text && !text.includes('\0')) { 
             setJobDescription(text);
        }
      } catch (err) {
        console.warn("Could not read file text", err);
      }
    }
  };

  const handleSubmit = () => {
    if (!jobTitle) {
      alert("Please enter a Job Title.");
      return;
    }
    if (!jobDescription && !file) {
      alert("Please enter a Job Description or upload a file.");
      return;
    }

    navigate('/interview', {
      state: {
        role: jobTitle,
        round: `${interviewType} Interview`,
        jobDescription: jobDescription || `Job Description for ${jobTitle} (File: ${file?.name})`,
        company: 'Target Company', // Generic company context
        difficulty: 'Professional',
        duration: 15
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors duration-300">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
            
            <button 
                onClick={() => navigate('/')} 
                className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Job Description-Based Interview</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Fill the details below to create your own custom interview practice</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-16">
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-2">Job Title <span className="text-red-500">*</span></label>
                            <input 
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                placeholder="e.g. Cyber Security Intern"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-2">Interview Type <span className="text-red-500">*</span></label>
                            <select 
                                value={interviewType}
                                onChange={(e) => setInterviewType(e.target.value)}
                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer appearance-none"
                            >
                                <option value="Internship">Internship</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch relative">
                        <div className="flex flex-col h-full">
                            <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-2">Add Job Description <span className="text-red-500">*</span></label>
                            <textarea 
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="w-full flex-1 min-h-[300px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                                placeholder="Paste the full job description here..."
                            />
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:flex absolute left-1/2 top-8 bottom-0 w-0 border-l border-dashed border-zinc-300 dark:border-zinc-700 -translate-x-1/2 items-center justify-center">
                             <span className="bg-white dark:bg-zinc-900 text-zinc-400 text-sm font-bold px-2 py-1 absolute">OR</span>
                        </div>
                        <div className="lg:hidden flex items-center gap-4 my-2">
                            <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1"></div>
                            <span className="text-zinc-400 text-sm font-bold">OR</span>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1"></div>
                        </div>

                        <div className="flex flex-col h-full">
                             <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-2 invisible lg:visible">Upload File</label>
                             <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-purple-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all min-h-[300px]"
                             >
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    className="hidden" 
                                    onChange={handleFileChange}
                                    accept=".txt,.md,.pdf,.doc,.docx"
                                />
                                {file ? (
                                    <div className="text-center">
                                        <FileText size={48} className="text-purple-600 mx-auto mb-4" />
                                        <p className="text-base font-medium text-zinc-900 dark:text-white mb-1">{file.name}</p>
                                        <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(2)} KB</p>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setFile(null); setJobDescription(''); }}
                                            className="mt-6 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                                        >
                                            Remove File
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Upload size={32} />
                                        </div>
                                        <p className="text-base font-medium text-zinc-700 dark:text-zinc-300 mb-2">Drag and drop your files here</p>
                                        <div className="flex items-center justify-center gap-3 text-xs text-zinc-400 mb-6 font-medium">
                                            <span className="h-px w-8 bg-zinc-200 dark:bg-zinc-700"></span>
                                            <span>OR</span>
                                            <span className="h-px w-8 bg-zinc-200 dark:bg-zinc-700"></span>
                                        </div>
                                        <span className="px-8 py-3 bg-purple-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-colors">
                                            BROWSE FILES
                                        </span>
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-10">
                        <button 
                            onClick={handleSubmit}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-12 py-3.5 rounded-lg font-bold text-sm shadow-xl shadow-purple-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-10 md:p-16 text-center border border-purple-100 dark:border-purple-900/20">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Benefits of Job Description-Based Interview</h2>
                <p className="text-zinc-600 dark:text-zinc-300 max-w-4xl mx-auto leading-relaxed text-lg">
                    JD Based Interviews transform job descriptions into personalized, AI-driven interview simulations. Simply input a job description and receive targeted questions addressing key skills, responsibilities, and industry demands. Engage with dynamic scenarios and multi-round assessments, supported by actionable analytics and feedback to sharpen responses and build confidence for real-world interviews.
                </p>
            </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};
