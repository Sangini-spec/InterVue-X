
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Globe, ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { JOBS } from '../data/jobs';

const ITEMS_PER_PAGE = 9;

export const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [activeChip, setActiveChip] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = JOBS.filter(job => {
    const matchesSearch = 
        job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || (filterType === 'Internships' && job.type === 'Internship');
    const matchesChip = activeChip === 'All' || (job.investors && job.investors.includes(activeChip)) || (activeChip === 'Public' && job.investors === 'Public');
    
    return matchesSearch && matchesType && matchesChip;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToJobDetail = (id: string) => {
      navigate(`/jobs/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 px-6 py-12 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header */}
          <div className="mb-8">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Jobs at Top Companies & Startups</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Explore jobs at rising startups and global tech giants. Practice with role-specific AI interviews.</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative">
                  <select 
                      className="appearance-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 pr-10 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-purple-500 w-full md:w-40 text-sm"
                      value={filterType}
                      onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                  >
                      <option value="All">All Jobs</option>
                      <option value="Internships">Internships</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <Briefcase size={16} />
                  </div>
              </div>

              <div className="relative">
                  <select className="appearance-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 pr-10 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-purple-500 w-full md:w-40 text-sm">
                      <option>Country</option>
                      <option>India</option>
                      <option>USA</option>
                      <option>Remote</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <Globe size={16} />
                  </div>
              </div>

              <div className="flex-1 relative">
                  <input 
                      type="text" 
                      placeholder="Search jobs by role, company, location" 
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 text-sm"
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-md text-xs font-bold transition-colors">
                      Search
                  </button>
              </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3 mb-10">
              {['All', 'Public', 'Sequoia', 'Tiger Global', 'Lightspeed', 'PeakXV', 'YC'].map(chip => (
                  <button
                      key={chip}
                      onClick={() => { setActiveChip(chip); setCurrentPage(1); }}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          activeChip === chip 
                          ? 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400' 
                          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                  >
                      {chip}
                  </button>
              ))}
          </div>

          {/* Job Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col h-full group cursor-pointer"
                    onClick={() => goToJobDetail(job.id)}
                  >
                      <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                              <div>
                                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white leading-tight group-hover:text-purple-600 transition-colors">{job.role}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">{job.company}</span>
                                      {job.type === 'Internship' && (
                                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">INTERN</span>
                                      )}
                                  </div>
                              </div>
                              <div className={`w-10 h-10 rounded-lg ${job.logoColor} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                                  {job.company[0]}
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-1 text-zinc-500 text-sm mb-3">
                              <MapPin size={14} /> {job.location}
                          </div>

                          {job.investors && job.investors !== 'Public' && (
                              <div className="text-xs text-zinc-500 mb-4 bg-zinc-50 dark:bg-zinc-800/50 px-2 py-1 rounded inline-block">
                                  ( Invested by {job.investors} )
                              </div>
                          )}

                          <p className="text-base text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                              {job.description}
                          </p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                          <button 
                              onClick={(e) => { e.stopPropagation(); goToJobDetail(job.id); }}
                              className="text-purple-600 dark:text-purple-400 text-sm font-semibold hover:underline flex items-center gap-1"
                          >
                              Check Interview Readiness <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                          </button>
                      </div>
                  </div>
              ))}
          </div>

          {filteredJobs.length === 0 && (
              <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-4">
                      <Search size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-white">No jobs found</h3>
                  <p className="text-zinc-500">Try adjusting your search or filters.</p>
              </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                        <ChevronLeft size={16} /> PREVIOUS
                    </button>
                    
                    <span className="text-sm font-medium text-zinc-900 dark:text-white px-4">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                        NEXT <ChevronRight size={16} />
                    </button>
                </div>
                
                <button 
                    onClick={() => navigate('/contact')}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                    Contact us <ArrowUpRight size={14} /> to post job for free on this page
                </button>
            </div>
          )}

        </div>
      </div>
      
      {/* Footer Reuse */}
      <Footer />
    </div>
  );
};
