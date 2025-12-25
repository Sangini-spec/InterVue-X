
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { parseJwt, registerUser, googleAuthenticate } from '../utils/auth';

const GOOGLE_CLIENT_ID = "918130002834-11b5smt2eoqgmqirft9alk8p8qbs47po.apps.googleusercontent.com";

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize Google Sign-In
    const initializeGoogleAuth = () => {
      if (window.google && window.google.accounts) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback,
            auto_select: false,
            use_fedcm_for_prompt: true 
          });

          window.google.accounts.id.renderButton(
            document.getElementById("googleSignUpDiv"),
            { 
              theme: "outline", 
              size: "large", 
              width: "100%",
              text: "signup_with"
            }
          );
        } catch (e) {
          console.error("Google Auth Init Failed", e);
        }
      } else {
         setTimeout(initializeGoogleAuth, 100);
      }
    };
    
    initializeGoogleAuth();
  }, []);

  const handleGoogleCallback = (response: any) => {
    try {
      const userObj = parseJwt(response.credential);
      if (userObj.email) {
          const authResult = googleAuthenticate(userObj);
          if (authResult.success) {
              navigate('/', { state: { loginSuccess: true } });
          } else {
              setError("Authentication failed.");
          }
      }
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
        const newUser = { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            role: '',
            bio: '',
            skills: ''
        };
        
        const result = registerUser(newUser);

        if (result.success) {
            // Redirect to Login page explicitly asking to log in
            navigate('/login', { state: { message: result.message } });
        } else {
            setError(result.message);
        }
    } else {
        setError('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 relative">
      
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={20} /> <span className="hidden sm:inline font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-2xl dark:shadow-black/50 transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Create an account</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">Join InterVue X to master your interviews</p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Email address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="Create a password"
            />
          </div>

          {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <AlertCircle size={16} /> {error}
              </div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all mt-2 shadow-lg shadow-purple-500/20 dark:shadow-purple-900/20">
            Create Account <ArrowRight size={18} />
          </button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or sign up with</span>
          </div>
        </div>

        <div className="space-y-3">
           <div id="googleSignUpDiv" className="w-full"></div>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <NavLink to="/login" className="text-zinc-900 dark:text-white font-medium hover:underline">Log in</NavLink>
        </p>
      </div>
    </div>
  );
};
