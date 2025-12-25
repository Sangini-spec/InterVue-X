
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, ExternalLink, FileText, PlayCircle } from 'lucide-react';
import { JOBS, JobListing } from '../data/jobs';
import { Footer } from '../components/Footer';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobListing | null>(null);
  const [similarJobs, setSimilarJobs] = useState<JobListing[]>([]);

  useEffect(() => {
    const foundJob = JOBS.find(j => j.id === id);
    if (foundJob) {
      setJob(foundJob);
      // Find similar jobs based on tags, excluding current
      const similar = JOBS.filter(j => 
        j.id !== id && 
        j.tags.some(tag => foundJob.tags.includes(tag))
      ).slice(0, 3);
      setSimilarJobs(similar);
      window.scrollTo(0, 0);
    } else {
      navigate('/jobs');
    }
  }, [id, navigate]);

  const handleResumeAnalyze = () => {
    if (!job) return;
    navigate('/resume-review', { 
      state: { 
        role: job.role,
        // Pass a combined context for the resume reviewer
        jobDescription: `
          Company: ${job.company}
          About Role: ${job.aboutRole || job.description}
          Responsibilities: ${job.responsibilities?.join('\n') || ''}
          Requirements: ${job.requirements?.join('\n') || ''}
        `
      } 
    });
  };

  const handlePracticeInterview = () => {
    if (!job) return;
    navigate('/interview', {
      state: {
        role: job.role,
        company: job.company,
        // Detailed JD ensures the AI interviewer has context
        jobDescription: `
          Company: ${job.company}
          About Role: ${job.aboutRole || job.description}
          Responsibilities: ${job.responsibilities?.join('\n') || ''}
          Requirements: ${job.requirements?.join('\n') || ''}
        `,
        round: 'Role Fitment',
        difficulty: 'Professional',
        duration: 15
      }
    });
  };

  if (!job) return null;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      
      <div className="flex-1 px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          
          <button 
            onClick={() => navigate('/jobs')} 
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline mb-8 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Jobs
          </button>

          {/* Job Header Card */}
          <div className="bg-purple-100 dark:bg-zinc-900 border border-purple-200 dark:border-zinc-800 rounded-2xl p-8 mb-8">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{job.role}</h1>
                   <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-semibold text-lg">
                      <span>{job.company}</span>
                   </div>
                   <div className="flex flex-wrap items-center gap-4 mt-4">
                      <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-sm">
                        <MapPin size={16} className="text-purple-600 dark:text-purple-400"/> {job.location}
                      </span>
                      
                      {job.applyLink && (
                        <>
                            <div className="hidden sm:block w-1 h-1 bg-zinc-400 rounded-full"></div>
                            <a 
                                href={job.applyLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-4 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-full shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-0.5"
                            >
                                Apply Now 
                                <ExternalLink size={12} className="group-hover:rotate-45 transition-transform duration-300" />
                            </a>
                        </>
                      )}
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center mt-4 md:mt-0">
                    <button 
                        onClick={handleResumeAnalyze}
                        className="flex-1 sm:flex-none px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <FileText size={18} /> Analyze Resume
                    </button>
                    <button 
                        onClick={handlePracticeInterview}
                        className="flex-1 sm:flex-none px-6 py-3 bg-white dark:bg-zinc-800 text-purple-600 dark:text-white border border-purple-200 dark:border-zinc-700 hover:bg-purple-50 dark:hover:bg-zinc-700 font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <PlayCircle size={18} /> Practice Interview
                    </button>
                </div>
             </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 space-y-8">
              
              {/* About Company */}
              {job.aboutCompany && (
                  <section>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">About the Company:</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                          {job.aboutCompany}
                      </p>
                  </section>
              )}

              {/* About Role */}
              {job.aboutRole && (
                  <section>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">About the Role:</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                          {job.aboutRole}
                      </p>
                  </section>
              )}

              {/* Responsibilities */}
              {job.responsibilities && (
                  <section>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">Key Responsibilities:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 text-base">
                          {job.responsibilities.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))}
                      </ul>
                  </section>
              )}

              {/* Requirements */}
              {job.requirements && (
                  <section>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">Requirements:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 text-base">
                          {job.requirements.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))}
                      </ul>
                  </section>
              )}
          </div>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
              <div className="mt-12">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Similar Jobs</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {similarJobs.map(job => (
                          <div 
                            key={job.id}
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
                          >
                              <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{job.role}</h3>
                              <p className="text-sm text-zinc-500 mb-2">{job.company}</p>
                              <div className="flex items-center gap-1 text-xs text-zinc-400 mb-3">
                                  <MapPin size={12}/> {job.location}
                              </div>
                              {/* Simple tags */}
                              <div className="flex flex-wrap gap-2">
                                  {job.tags.slice(0, 2).map(tag => (
                                      <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] rounded-full">
                                          {tag}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};
