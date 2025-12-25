
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Download, Wand2, FileText, ChevronDown, ChevronUp, Printer, Loader2, ArrowLeft, LayoutTemplate } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useNavigate, useLocation } from 'react-router-dom';

const API_KEY = process.env.API_KEY || '';

// --- TYPES ---
interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  date: string;
  gpa: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string; // Comma separated
  certifications: Certification[];
  achievements: Achievement[];
}

const INITIAL_DATA: ResumeData = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  website: "johndoe.com",
  summary: "Results-oriented Software Engineer with experience in full-stack development, cloud computing, and AI integration.\n\nProven track record of delivering scalable solutions and optimizing system performance.",
  skills: "JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, GraphQL, SQL, NoSQL, Git",
  education: [
    {
      id: '1',
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      location: "New York, NY",
      date: "May 2020",
      gpa: "3.8/4.0"
    }
  ],
  experience: [
    {
      id: '1',
      role: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      date: "June 2020 - Present",
      description: "• Led a team of 5 developers to build a microservices architecture.\n• Reduced API latency by 40% through caching strategies.\n• Implemented CI/CD pipelines increasing deployment frequency."
    }
  ],
  certifications: [],
  achievements: []
};

type TemplateId = 'professional' | 'modern' | 'creative' | 'academic';

export const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [activeSection, setActiveSection] = useState<string | null>('personal');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateId>('professional');

  // Load template from navigation state if available
  useEffect(() => {
    if (location.state && location.state.templateId) {
        setCurrentTemplate(location.state.templateId);
    }
  }, [location.state]);

  // --- HANDLERS ---

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addItem = (field: keyof ResumeData, item: any) => {
    setData({ ...data, [field]: [...(data[field] as any[]), { ...item, id: Date.now().toString() }] });
  };

  const updateItem = (field: keyof ResumeData, id: string, key: string, value: string) => {
    const list = data[field] as any[];
    const newList = list.map(item => item.id === id ? { ...item, [key]: value } : item);
    setData({ ...data, [field]: newList });
  };

  const removeItem = (field: keyof ResumeData, id: string) => {
    const list = data[field] as any[];
    setData({ ...data, [field]: list.filter(item => item.id !== id) });
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAIPolish = async () => {
    if (!API_KEY) {
        alert("API Key missing");
        return;
    }
    setIsOptimizing(true);
    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        const prompt = `
        Act as a professional resume writer. Rewrite the following resume summary and experience bullet points to be more impactful, action-oriented, and ATS-friendly. 
        Keep the JSON structure exactly the same.
        
        Input Data:
        ${JSON.stringify({ summary: data.summary, experience: data.experience })}
        
        Return ONLY valid JSON.
        `;
        
        const result = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        
        const responseText = result.text;
        const optimized = JSON.parse(responseText);
        
        setData(prev => ({
            ...prev,
            summary: optimized.summary || prev.summary,
            experience: optimized.experience || prev.experience
        }));
        
    } catch (e) {
        console.error("AI Polish failed", e);
        alert("Failed to optimize content. Please try again.");
    } finally {
        setIsOptimizing(false);
    }
  };

  // --- RENDER TEMPLATES ---

  const renderTemplateContent = () => {
      switch (currentTemplate) {
          case 'modern':
              return (
                  // Modern Layout: Sidebar on Left
                  <div className="flex h-full font-sans">
                      {/* Sidebar */}
                      <div className="w-[30%] bg-[#2c3e50] text-white p-6 flex flex-col gap-6">
                          <div className="mb-4">
                             <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4 text-white">
                                {data.fullName.charAt(0)}
                             </div>
                             <h2 className="text-xl font-bold text-center break-words leading-tight">{data.fullName}</h2>
                          </div>

                          <div className="text-sm space-y-2 opacity-90 break-words">
                              {data.email && <div className="flex flex-col"><span className="font-bold opacity-60 text-xs">Email</span>{data.email}</div>}
                              {data.phone && <div className="flex flex-col"><span className="font-bold opacity-60 text-xs">Phone</span>{data.phone}</div>}
                              {data.linkedin && <div className="flex flex-col"><span className="font-bold opacity-60 text-xs">LinkedIn</span>{data.linkedin.replace('https://','')}</div>}
                              {data.website && <div className="flex flex-col"><span className="font-bold opacity-60 text-xs">Web</span>{data.website.replace('https://','')}</div>}
                          </div>

                          {data.skills && (
                              <div>
                                  <h3 className="uppercase tracking-widest text-xs font-bold border-b border-white/20 pb-1 mb-2">Skills</h3>
                                  <div className="flex flex-wrap gap-2">
                                      {data.skills.split(',').map((skill, i) => (
                                          <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs">{skill.trim()}</span>
                                      ))}
                                  </div>
                              </div>
                          )}

                          {data.education.length > 0 && (
                             <div>
                                <h3 className="uppercase tracking-widest text-xs font-bold border-b border-white/20 pb-1 mb-2">Education</h3>
                                {data.education.map(edu => (
                                    <div key={edu.id} className="mb-3 text-sm">
                                        <div className="font-bold">{edu.school}</div>
                                        <div className="italic text-xs opacity-80">{edu.degree}</div>
                                        <div className="text-xs opacity-70">{edu.date}</div>
                                    </div>
                                ))}
                             </div>
                          )}
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 p-8 bg-white text-zinc-800">
                          {data.summary && (
                              <section className="mb-6">
                                  <h2 className="text-xl font-bold uppercase text-[#2c3e50] mb-3 border-b-2 border-[#2c3e50] pb-1">Profile</h2>
                                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{data.summary}</p>
                              </section>
                          )}

                          {data.experience.length > 0 && (
                              <section className="mb-6">
                                  <h2 className="text-xl font-bold uppercase text-[#2c3e50] mb-3 border-b-2 border-[#2c3e50] pb-1">Experience</h2>
                                  <div className="space-y-5">
                                      {data.experience.map(exp => (
                                          <div key={exp.id}>
                                              <div className="flex justify-between items-baseline mb-1">
                                                  <h3 className="font-bold text-lg text-zinc-900">{exp.role}</h3>
                                                  <span className="text-sm font-medium text-zinc-500">{exp.date}</span>
                                              </div>
                                              <div className="text-md font-semibold text-[#2c3e50] mb-2">{exp.company} | {exp.location}</div>
                                              <div className="text-sm text-zinc-700 whitespace-pre-wrap">
                                                  {exp.description}
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </section>
                          )}

                          {data.achievements.length > 0 && (
                              <section>
                                  <h2 className="text-xl font-bold uppercase text-[#2c3e50] mb-3 border-b-2 border-[#2c3e50] pb-1">Achievements</h2>
                                  <ul className="space-y-3">
                                      {data.achievements.map(ach => (
                                          <li key={ach.id}>
                                              <div className="font-bold text-sm">{ach.title}</div>
                                              <div className="text-sm text-zinc-600 whitespace-pre-wrap">{ach.description}</div>
                                          </li>
                                      ))}
                                  </ul>
                              </section>
                          )}
                      </div>
                  </div>
              );

          case 'creative':
              return (
                  // Creative Layout: Bold Header Block
                  <div className="h-full bg-white font-sans text-zinc-800">
                      <header className="bg-zinc-900 text-white p-10">
                          <h1 className="text-5xl font-bold mb-2 tracking-tight">{data.fullName}</h1>
                          <p className="text-lg opacity-80 max-w-2xl whitespace-pre-wrap">{data.summary}</p>
                          
                          <div className="flex flex-wrap gap-4 mt-6 text-sm text-zinc-400">
                              {data.email && <span>{data.email}</span>}
                              {data.phone && <span>| {data.phone}</span>}
                              {data.linkedin && <span>| {data.linkedin.replace('https://','')}</span>}
                              {data.website && <span>| {data.website.replace('https://','')}</span>}
                          </div>
                      </header>

                      <div className="p-10 grid grid-cols-3 gap-8">
                          {/* Left Col (Main) */}
                          <div className="col-span-2 space-y-8">
                               {data.experience.length > 0 && (
                                  <section>
                                      <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                          <span className="w-2 h-8 bg-purple-600 block"></span> Experience
                                      </h3>
                                      <div className="space-y-8">
                                          {data.experience.map(exp => (
                                              <div key={exp.id} className="relative pl-6 border-l-2 border-zinc-200">
                                                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-200 border-2 border-white"></div>
                                                  <div className="mb-2">
                                                      <h4 className="font-bold text-lg">{exp.role}</h4>
                                                      <div className="text-purple-700 font-medium">{exp.company}</div>
                                                      <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{exp.date}</div>
                                                  </div>
                                                  <p className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
                                                    {exp.description}
                                                  </p>
                                              </div>
                                          ))}
                                      </div>
                                  </section>
                               )}
                          </div>

                          {/* Right Col (Sidebarish) */}
                          <div className="space-y-8">
                              {data.skills && (
                                  <section>
                                      <h3 className="font-bold text-xl mb-4 border-b-4 border-purple-600 inline-block pb-1">Skills</h3>
                                      <div className="flex flex-wrap gap-2">
                                          {data.skills.split(',').map((skill, i) => (
                                              <span key={i} className="bg-zinc-100 text-zinc-800 px-3 py-1 font-medium text-sm border border-zinc-200">
                                                  {skill.trim()}
                                              </span>
                                          ))}
                                      </div>
                                  </section>
                              )}

                              {data.education.length > 0 && (
                                  <section>
                                      <h3 className="font-bold text-xl mb-4 border-b-4 border-purple-600 inline-block pb-1">Education</h3>
                                      <div className="space-y-4">
                                          {data.education.map(edu => (
                                              <div key={edu.id} className="bg-zinc-50 p-4 border border-zinc-100">
                                                  <div className="font-bold text-sm">{edu.school}</div>
                                                  <div className="text-sm italic">{edu.degree}</div>
                                                  <div className="text-xs text-zinc-500 mt-1">{edu.date}</div>
                                              </div>
                                          ))}
                                      </div>
                                  </section>
                              )}

                              {data.certifications.length > 0 && (
                                  <section>
                                      <h3 className="font-bold text-xl mb-4 border-b-4 border-purple-600 inline-block pb-1">Certifications</h3>
                                      <ul className="space-y-2 text-sm">
                                          {data.certifications.map(cert => (
                                              <li key={cert.id} className="mb-2">
                                                  <div className="font-bold">{cert.name}</div>
                                                  <div className="text-xs text-zinc-500">{cert.issuer}</div>
                                              </li>
                                          ))}
                                      </ul>
                                  </section>
                              )}
                          </div>
                      </div>
                  </div>
              );
              
          case 'academic':
              return (
                  // Academic / Overleaf Style (LaTeX lookalike)
                  <div className="font-serif text-black p-[15mm] h-full" style={{ fontFamily: '"Latin Modern Roman", "Times New Roman", serif' }}>
                      {/* Header */}
                      <header className="text-center mb-6">
                          <h1 className="text-3xl font-normal mb-1">{data.fullName}</h1>
                          <div className="text-sm flex flex-wrap justify-center gap-4">
                              {data.phone && <span>{data.phone}</span>}
                              {data.email && <a href={`mailto:${data.email}`} className="text-black no-underline">{data.email}</a>}
                              {data.linkedin && <a href={`https://${data.linkedin}`} className="text-black no-underline">{data.linkedin.replace('https://','')}</a>}
                              {data.github && <a href={`https://${data.github}`} className="text-black no-underline">{data.github.replace('https://','')}</a>}
                          </div>
                      </header>

                      {/* Summary (Header Removed) */}
                      {data.summary && (
                          <section className="mb-4">
                              <p className="text-sm leading-snug whitespace-pre-wrap text-justify">
                                  {data.summary}
                              </p>
                          </section>
                      )}
                      
                      {/* Education */}
                      {data.education.length > 0 && (
                        <section className="mb-4">
                           <div className="uppercase font-bold text-sm border-b border-black mb-2 pb-0.5">Education</div>
                           {data.education.map(edu => (
                               <div key={edu.id} className="mb-2">
                                   <div className="flex justify-between font-bold text-sm">
                                       <span>{edu.school}</span>
                                       <span>{edu.location}</span>
                                   </div>
                                   <div className="flex justify-between text-sm italic">
                                       <span>{edu.degree}</span>
                                       <span>{edu.date}</span>
                                   </div>
                               </div>
                           ))}
                        </section>
                      )}

                      {/* Experience */}
                      {data.experience.length > 0 && (
                        <section className="mb-4">
                           <div className="uppercase font-bold text-sm border-b border-black mb-2 pb-0.5">Experience</div>
                           {data.experience.map(exp => (
                               <div key={exp.id} className="mb-3">
                                   <div className="flex justify-between font-bold text-sm">
                                       <span>{exp.role}</span>
                                       <span>{exp.date}</span>
                                   </div>
                                   <div className="flex justify-between text-sm italic mb-1">
                                       <span>{exp.company}</span>
                                       <span>{exp.location}</span>
                                   </div>
                                   <div className="text-sm leading-snug text-justify whitespace-pre-wrap ml-2">
                                       {exp.description}
                                   </div>
                               </div>
                           ))}
                        </section>
                      )}
                      
                      {/* Skills */}
                      {data.skills && (
                        <section className="mb-4">
                           <div className="uppercase font-bold text-sm border-b border-black mb-2 pb-0.5">Technical Skills</div>
                           <p className="text-sm leading-snug">
                               <span className="font-bold">Languages & Technologies: </span>{data.skills}
                           </p>
                        </section>
                      )}

                      {/* Certifications & Achievements combined for academic style */}
                      {(data.certifications.length > 0 || data.achievements.length > 0) && (
                        <section className="mb-4">
                           <div className="uppercase font-bold text-sm border-b border-black mb-2 pb-0.5">Honors & Certifications</div>
                           <ul className="list-disc ml-4 text-sm space-y-0.5">
                               {data.certifications.map(cert => (
                                   <li key={cert.id}>
                                       <span className="font-bold">{cert.name}</span>, {cert.issuer} ({cert.date})
                                   </li>
                               ))}
                               {data.achievements.map(ach => (
                                   <li key={ach.id}>
                                       <span className="font-bold">{ach.title}</span>: {ach.description}
                                   </li>
                               ))}
                           </ul>
                        </section>
                      )}
                  </div>
              );

          case 'professional':
          default:
              return (
                  // Classic / Professional Layout (Serif)
                  <div className="font-serif text-black p-[15mm] h-full" style={{ fontFamily: '"Cambria", "Times New Roman", serif' }}>
                        {/* 1. Header */}
                        <header className="text-center mb-6">
                            <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{data.fullName || 'YOUR NAME'}</h1>
                            <div className="text-[10pt] flex flex-wrap justify-center gap-3 text-zinc-700">
                                {data.phone && <span>{data.phone}</span>}
                                {data.phone && data.email && <span>•</span>}
                                {data.email && <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>}
                                {data.email && data.linkedin && <span>•</span>}
                                {data.linkedin && <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">{data.linkedin.replace('https://','')}</a>}
                                {data.github && <span>•</span>}
                                {data.github && <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="hover:underline">{data.github.replace('https://','')}</a>}
                                {data.website && <span>•</span>}
                                {data.website && <a href={`https://${data.website}`} target="_blank" rel="noreferrer" className="hover:underline">{data.website.replace('https://','')}</a>}
                            </div>
                        </header>

                        {/* Summary (Header Removed) */}
                        {data.summary && (
                            <section className="mb-4">
                                <p className="text-[10.5pt] leading-relaxed whitespace-pre-wrap text-justify">
                                    {data.summary}
                                </p>
                            </section>
                        )}

                        {/* 2. Education */}
                        {data.education.length > 0 && (
                            <section className="mb-4">
                                <h2 className="text-[11pt] font-bold uppercase border-b border-black mb-2 tracking-wider">Education</h2>
                                <div className="space-y-2">
                                    {data.education.map(edu => (
                                        <div key={edu.id} className="flex justify-between items-baseline text-[10.5pt]">
                                            <div>
                                                <span className="font-bold">{edu.school}</span>
                                                <div className="italic">{edu.degree}</div>
                                            </div>
                                            <div className="text-right">
                                                <div>{edu.location}</div>
                                                <div className="italic">{edu.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. Skills */}
                        {data.skills && (
                            <section className="mb-4">
                                <h2 className="text-[11pt] font-bold uppercase border-b border-black mb-2 tracking-wider">Skills</h2>
                                <p className="text-[10.5pt] leading-relaxed">
                                    {data.skills}
                                </p>
                            </section>
                        )}

                        {/* 4. Experience */}
                        {data.experience.length > 0 && (
                            <section className="mb-4">
                                <h2 className="text-[11pt] font-bold uppercase border-b border-black mb-2 tracking-wider">Experience</h2>
                                <div className="space-y-4">
                                    {data.experience.map(exp => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline text-[10.5pt] mb-1">
                                                <div>
                                                    <span className="font-bold">{exp.role}</span>
                                                    <span className="mx-1">|</span>
                                                    <span className="italic">{exp.company}</span>
                                                </div>
                                                <div className="text-right whitespace-nowrap">
                                                    {exp.location && <span className="mr-2">{exp.location}</span>}
                                                    <span className="italic">{exp.date}</span>
                                                </div>
                                            </div>
                                            <div className="text-[10pt] leading-snug text-justify whitespace-pre-wrap">
                                                {exp.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 5. Certifications */}
                        {data.certifications.length > 0 && (
                            <section className="mb-4">
                                <h2 className="text-[11pt] font-bold uppercase border-b border-black mb-2 tracking-wider">Certifications</h2>
                                <ul className="text-[10.5pt] space-y-1">
                                    {data.certifications.map(cert => (
                                        <li key={cert.id} className="flex justify-between">
                                            <span>
                                                <span className="font-bold">{cert.name}</span>
                                                {cert.issuer && <span className="italic"> — {cert.issuer}</span>}
                                            </span>
                                            <span className="italic">{cert.date}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* 6. Achievements */}
                        {data.achievements.length > 0 && (
                            <section className="mb-4">
                                <h2 className="text-[11pt] font-bold uppercase border-b border-black mb-2 tracking-wider">Achievements</h2>
                                <ul className="text-[10.5pt] space-y-2 mt-2">
                                    {data.achievements.map(ach => (
                                        <li key={ach.id}>
                                            <div className="font-bold">{ach.title}</div>
                                            <div className="text-[10pt] whitespace-pre-wrap">{ach.description}</div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                  </div>
              );
      }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex flex-col md:flex-row print:bg-white print:block">
      
      {/* --- LEFT PANEL: EDITOR (Hidden on Print) --- */}
      <div className="w-full md:w-[450px] lg:w-[500px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-screen overflow-y-auto print:hidden shadow-xl z-10 flex flex-col">
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/')} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <FileText size={20} className="text-purple-600" /> Resume Builder
                    </h2>
                    <p className="text-xs text-zinc-500">ATS-Friendly Layouts</p>
                </div>
            </div>
            <div className="flex gap-2">
                {/* Template Switcher */}
                <div className="relative group">
                    <button className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Change Template">
                        <LayoutTemplate size={18} />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-2 hidden group-hover:block z-50">
                        <button onClick={() => setCurrentTemplate('professional')} className={`w-full text-left px-3 py-2 text-sm rounded-lg mb-1 ${currentTemplate === 'professional' ? 'bg-purple-50 text-purple-700 font-bold' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>Professional</button>
                        <button onClick={() => setCurrentTemplate('academic')} className={`w-full text-left px-3 py-2 text-sm rounded-lg mb-1 ${currentTemplate === 'academic' ? 'bg-purple-50 text-purple-700 font-bold' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>Academic (Overleaf)</button>
                        <button onClick={() => setCurrentTemplate('modern')} className={`w-full text-left px-3 py-2 text-sm rounded-lg mb-1 ${currentTemplate === 'modern' ? 'bg-purple-50 text-purple-700 font-bold' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>Modern Sidebar</button>
                        <button onClick={() => setCurrentTemplate('creative')} className={`w-full text-left px-3 py-2 text-sm rounded-lg ${currentTemplate === 'creative' ? 'bg-purple-50 text-purple-700 font-bold' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>Creative Bold</button>
                    </div>
                </div>

                <button 
                    onClick={handleAIPolish}
                    disabled={isOptimizing}
                    className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    title="Polish with AI"
                >
                    {isOptimizing ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                </button>
                <button 
                    onClick={handlePrint}
                    className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    title="Download PDF"
                >
                    <Printer size={18} />
                </button>
            </div>
        </div>

        <div className="p-5 space-y-4 pb-20">
            
            {/* Personal Info */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <button onClick={() => toggleSection('personal')} className="w-full p-4 bg-zinc-50 dark:bg-zinc-800/50 flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                    Personal Information
                    {activeSection === 'personal' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {activeSection === 'personal' && (
                    <div className="p-4 space-y-3 bg-white dark:bg-zinc-900">
                        <input type="text" name="fullName" placeholder="Full Name" value={data.fullName} onChange={handlePersonalChange} className="w-full p-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                        <div className="grid grid-cols-2 gap-3">
                            <input type="email" name="email" placeholder="Email" value={data.email} onChange={handlePersonalChange} className="w-full p-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                            <input type="text" name="phone" placeholder="Phone" value={data.phone} onChange={handlePersonalChange} className="w-full p-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" name="linkedin" placeholder="LinkedIn URL" value={data.linkedin} onChange={handlePersonalChange} className="w-full p-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                            <input type="text" name="github" placeholder="GitHub URL" value={data.github} onChange={handlePersonalChange} className="w-full p-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                        </div>
                        <input type="text" name="website" placeholder="Portfolio Website" value={data.website} onChange={handlePersonalChange} className="w-full p-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                    </div>
                )}
            </div>

            {/* Summary */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <button onClick={() => toggleSection('summary')} className="w-full p-4 bg-zinc-50 dark:bg-zinc-800/50 flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                    Professional Summary
                    {activeSection === 'summary' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {activeSection === 'summary' && (
                    <div className="p-4 bg-white dark:bg-zinc-900">
                        <textarea 
                            name="summary" 
                            rows={4} 
                            placeholder="Write a brief summary of your career..." 
                            value={data.summary} 
                            onChange={handlePersonalChange} 
                            className="w-full p-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white resize-none"
                        />
                    </div>
                )}
            </div>

            {/* Education */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <button onClick={() => toggleSection('education')} className="w-full p-4 bg-zinc-50 dark:bg-zinc-800/50 flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                    Education
                    {activeSection === 'education' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {activeSection === 'education' && (
                    <div className="p-4 bg-white dark:bg-zinc-900 space-y-4">
                        {data.education.map((edu, idx) => (
                            <div key={edu.id} className="p-3 border border-zinc-100 dark:border-zinc-800 rounded relative group">
                                <button onClick={() => removeItem('education', edu.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                                <input type="text" placeholder="School/University" value={edu.school} onChange={(e) => updateItem('education', edu.id, 'school', e.target.value)} className="w-full p-1.5 mb-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)} className="w-full p-1.5 mb-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" placeholder="Date (e.g. May 2020)" value={edu.date} onChange={(e) => updateItem('education', edu.id, 'date', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                    <input type="text" placeholder="Location" value={edu.location} onChange={(e) => updateItem('education', edu.id, 'location', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addItem('education', { school: '', degree: '', date: '', location: '', gpa: '' })} className="w-full py-2 flex items-center justify-center gap-2 text-sm text-purple-600 border border-dashed border-purple-300 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20">
                            <Plus size={14}/> Add Education
                        </button>
                    </div>
                )}
            </div>

            {/* Experience */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <button onClick={() => toggleSection('experience')} className="w-full p-4 bg-zinc-50 dark:bg-zinc-800/50 flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                    Experience
                    {activeSection === 'experience' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {activeSection === 'experience' && (
                    <div className="p-4 bg-white dark:bg-zinc-900 space-y-4">
                        {data.experience.map((exp, idx) => (
                            <div key={exp.id} className="p-3 border border-zinc-100 dark:border-zinc-800 rounded relative group">
                                <button onClick={() => removeItem('experience', exp.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                                <input type="text" placeholder="Job Title" value={exp.role} onChange={(e) => updateItem('experience', exp.id, 'role', e.target.value)} className="w-full p-1.5 mb-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)} className="w-full p-1.5 mb-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    <input type="text" placeholder="Date Range" value={exp.date} onChange={(e) => updateItem('experience', exp.id, 'date', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                    <input type="text" placeholder="Location" value={exp.location} onChange={(e) => updateItem('experience', exp.id, 'location', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                </div>
                                <textarea rows={4} placeholder="Description (Bullet points)" value={exp.description} onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white resize-none" />
                            </div>
                        ))}
                        <button onClick={() => addItem('experience', { role: '', company: '', date: '', location: '', description: '' })} className="w-full py-2 flex items-center justify-center gap-2 text-sm text-purple-600 border border-dashed border-purple-300 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20">
                            <Plus size={14}/> Add Experience
                        </button>
                    </div>
                )}
            </div>

            {/* Skills */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <button onClick={() => toggleSection('skills')} className="w-full p-4 bg-zinc-50 dark:bg-zinc-800/50 flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                    Skills
                    {activeSection === 'skills' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {activeSection === 'skills' && (
                    <div className="p-4 bg-white dark:bg-zinc-900">
                        <textarea 
                            name="skills" 
                            rows={3} 
                            placeholder="Java, Python, React, Leadership, etc." 
                            value={data.skills} 
                            onChange={handlePersonalChange} 
                            className="w-full p-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white resize-none"
                        />
                    </div>
                )}
            </div>
            
            {/* Certifications & Achievements */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <button onClick={() => toggleSection('certifications')} className="w-full p-4 bg-zinc-50 dark:bg-zinc-800/50 flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                    Certifications & Achievements
                    {activeSection === 'certifications' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {activeSection === 'certifications' && (
                    <div className="p-4 bg-white dark:bg-zinc-900 space-y-4">
                        <h4 className="text-xs font-bold uppercase text-zinc-500">Certifications</h4>
                        {data.certifications.map((cert, idx) => (
                            <div key={cert.id} className="p-3 border border-zinc-100 dark:border-zinc-800 rounded relative group">
                                <button onClick={() => removeItem('certifications', cert.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                                <input type="text" placeholder="Certification Name" value={cert.name} onChange={(e) => updateItem('certifications', cert.id, 'name', e.target.value)} className="w-full p-1.5 mb-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" placeholder="Issuer" value={cert.issuer} onChange={(e) => updateItem('certifications', cert.id, 'issuer', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                    <input type="text" placeholder="Date" value={cert.date} onChange={(e) => updateItem('certifications', cert.id, 'date', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })} className="w-full py-2 flex items-center justify-center gap-2 text-sm text-purple-600 border border-dashed border-purple-300 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20">
                            <Plus size={14}/> Add Certification
                        </button>
                        
                        <div className="border-t border-zinc-100 dark:border-zinc-800 my-4"></div>
                        
                        <h4 className="text-xs font-bold uppercase text-zinc-500">Achievements</h4>
                        {data.achievements.map((ach, idx) => (
                            <div key={ach.id} className="p-3 border border-zinc-100 dark:border-zinc-800 rounded relative group">
                                <button onClick={() => removeItem('achievements', ach.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                                <input type="text" placeholder="Title" value={ach.title} onChange={(e) => updateItem('achievements', ach.id, 'title', e.target.value)} className="w-full p-1.5 mb-2 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
                                <textarea rows={2} placeholder="Description" value={ach.description} onChange={(e) => updateItem('achievements', ach.id, 'description', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-zinc-950 dark:border-zinc-800 dark:text-white resize-none" />
                            </div>
                        ))}
                        <button onClick={() => addItem('achievements', { title: '', description: '' })} className="w-full py-2 flex items-center justify-center gap-2 text-sm text-purple-600 border border-dashed border-purple-300 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20">
                            <Plus size={14}/> Add Achievement
                        </button>
                    </div>
                )}
            </div>

        </div>
      </div>

      {/* --- RIGHT PANEL: PREVIEW --- */}
      <div className="flex-1 bg-zinc-100 dark:bg-zinc-950 flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
          <div className="bg-white text-black shadow-2xl w-[210mm] min-h-[297mm] print:shadow-none print:w-full print:h-auto origin-top scale-[0.8] md:scale-90 lg:scale-100 transition-transform duration-200">
             {renderTemplateContent()}
          </div>
      </div>
    </div>
  );
};
