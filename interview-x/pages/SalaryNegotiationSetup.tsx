
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Briefcase, TrendingUp, CheckCircle } from 'lucide-react';

export const SalaryNegotiationSetup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentSalary: '',
    offeredSalary: '',
    desiredSalary: '',
    currency: '$'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStart = () => {
    if (!formData.offeredSalary || !formData.desiredSalary) {
      alert("Please fill in at least the Offered Salary and Desired Salary.");
      return;
    }

    navigate('/interview', {
      state: {
        role: 'Salary Negotiation',
        company: 'TechCorp Inc.', // Generic placeholder or could be added to form
        round: 'Salary Negotiation',
        difficulty: 'Hard',
        duration: 15,
        interviewer: 'john', // John sounds like a hiring manager
        salaryContext: {
            current: formData.currentSalary,
            offered: formData.offeredSalary,
            desired: formData.desiredSalary,
            currency: formData.currency
        },
        jobDescription: `
          This is a specific negotiation scenario. 
          The candidate has been offered ${formData.currency}${formData.offeredSalary}.
          The candidate is currently making ${formData.currency}${formData.currentSalary}.
          The candidate wants ${formData.currency}${formData.desiredSalary}.
          
          Role: Senior Software Engineer.
          Performance in interviews: Strong/Hire.
        `
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          
          <button 
            onClick={() => navigate('/')} 
            className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </button>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <DollarSign className="w-8 h-8" /> Salary Negotiation Sim
              </h1>
              <p className="text-green-100 opacity-90">
                Practice the art of negotiation with an AI Hiring Manager. Define your numbers and see if you can close the deal.
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
                
                {/* Inputs */}
                <div className="space-y-6">
                   <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Currency</label>
                      <select 
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500"
                      >
                        <option value="$">USD ($)</option>
                        <option value="₹">INR (₹)</option>
                        <option value="€">EUR (€)</option>
                        <option value="£">GBP (£)</option>
                      </select>
                   </div>

                   <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Current Salary (Annual)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">{formData.currency}</span>
                        <input 
                          type="number" 
                          name="currentSalary"
                          placeholder="e.g. 80000"
                          value={formData.currentSalary}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                   </div>

                   <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Initial Offer (from Company)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">{formData.currency}</span>
                        <input 
                          type="number" 
                          name="offeredSalary"
                          placeholder="e.g. 100000"
                          value={formData.offeredSalary}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                   </div>

                   <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Target / Desired Salary</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">{formData.currency}</span>
                        <input 
                          type="number" 
                          name="desiredSalary"
                          placeholder="e.g. 120000"
                          value={formData.desiredSalary}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                   </div>
                </div>

                {/* Tips Panel */}
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-8 border border-zinc-100 dark:border-zinc-800 flex flex-col h-full">
                   <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                     <TrendingUp size={20} className="text-green-600" /> Negotiation Strategy
                   </h3>
                   
                   <ul className="space-y-6 text-base text-zinc-600 dark:text-zinc-400 flex-1">
                     <li className="flex gap-4">
                       <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                       <span><strong>Know your worth:</strong> The AI will try to lowball you based on the offer. Be ready to justify your target.</span>
                     </li>
                     <li className="flex gap-4">
                       <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                       <span><strong>Don't say "Yes" immediately:</strong> Even if the offer is good, always ask for time or a slight bump.</span>
                     </li>
                     <li className="flex gap-4">
                       <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                       <span><strong>Focus on Value:</strong> Discuss skills, market rates, and what you bring to the table, not just personal needs.</span>
                     </li>
                     <li className="flex gap-4">
                       <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                       <span><strong>Duration:</strong> This session is capped at 15 minutes to simulate a quick HR call.</span>
                     </li>
                   </ul>
                </div>

              </div>

              <div className="flex justify-center">
                <button 
                    onClick={handleStart}
                    className="w-full md:w-auto px-12 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    <Briefcase size={20} /> Start Negotiation
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
