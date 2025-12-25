
import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle, Loader2, MapPin, Mail, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const USE_CASES = [
  {
    title: "For Platform Integration (API)",
    description: "Seamlessly add our live interview simulation to your product using API, Widget, or LMS toolkit.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    link: "#"
  },
  {
    title: "For Colleges and Universities",
    description: "Prepare your students for their upcoming job/internship interviews, career fairs, and campus placements.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    link: "#"
  },
  {
    title: "For Recruiters",
    description: "Get connected to job seekers who go the extra mile in job preparation and verify skills effectively.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600",
    link: "#"
  },
  {
    title: "For Schools",
    description: "Help students improve their learning capabilities with the help of conversational AI tutors.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    link: "#"
  }
];

export const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', location: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-6 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Back Button */}
        <button 
            onClick={() => navigate('/')} 
            className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
            <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Use Cases */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Use Cases</h1>
              <a href="#" className="text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center gap-1">
                More <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {USE_CASES.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <div className="absolute inset-0 bg-zinc-900">
                     <img 
                       src={item.image} 
                       alt={item.title} 
                       className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-60 transition-all duration-500"
                     />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                    <p className="text-zinc-300 text-sm mb-4 line-clamp-3">{item.description}</p>
                    <span className="inline-flex items-center gap-1 text-white font-semibold text-sm border-b border-white pb-0.5 hover:text-purple-300 hover:border-purple-300 transition-colors">
                      Learn More
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info Snippet */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <MapPin size={20} />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-zinc-900 dark:text-white">Headquarters</div>
                    <div>Uttar Pradesh, India</div>
                  </div>
               </div>
               <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Mail size={20} />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-zinc-900 dark:text-white">Email Us</div>
                    <div>sanginitripathi28@gmail.com</div>
                  </div>
               </div>
               <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Phone size={20} />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-zinc-900 dark:text-white">Call Us</div>
                    <div>+1 (555) 123-4567</div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-5">
             <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 sticky top-24">
                <div className="text-center mb-8">
                   <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Contact Us</h2>
                   <p className="text-zinc-500 dark:text-zinc-400 text-sm">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Location</label>
                      <input 
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Message</label>
                      <textarea 
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-all"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2">SUBMIT <Send size={16} /></span>}
                    </button>
                  </form>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
