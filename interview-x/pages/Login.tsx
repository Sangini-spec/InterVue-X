
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { parseJwt, authenticateUser, googleAuthenticate } from '../utils/auth';

const GOOGLE_CLIENT_ID = "918130002834-11b5smt2eoqgmqirft9alk8p8qbs47po.apps.googleusercontent.com";

declare global {
  interface Window {
    google: any;
  }
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check for success message from Signup redirect
    if (location.state?.message) {
        setSuccessMessage(location.state.message);
        // Clear the state to prevent message from showing on refresh
        window.history.replaceState({}, document.title);
    }

    // Initialize Real Google Sign-In
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
            document.getElementById("googleSignInDiv"),
            { 
              theme: "outline", 
              size: "large", 
              width: "100%", 
              text: "continue_with"
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
  }, [location]);

  const handleGoogleCallback = (response: any) => {
    try {
      const userObj = parseJwt(response.credential);
      if (userObj.email) {
          const authResult = googleAuthenticate(userObj);
          if (authResult.success) {
              navigate('/', { state: { loginSuccess: true } });
          } else {
              setError("Google authentication failed.");
          }
      }
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if(email && password) {
        const result = authenticateUser(email, password);
        if (result.success) {
            navigate('/', { state: { loginSuccess: true } });
        } else {
            setError(result.message);
        }
    } else {
        setError('Please enter both email and password.');
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
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">Sign in to your InterVue X account</p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Real Google Sign-In Container */}
          <div className="w-full h-[44px] flex justify-center">
             <div id="googleSignInDiv" className="w-full"></div>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or continue with email</span>
            </div>
         </div>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1.5">Email address</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400">Password</label>
                <a href="#" className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300">Forgot password?</a>
            </div>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          {successMessage && (
              <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-900/30">
                  <CheckCircle size={16} /> {successMessage}
              </div>
          )}

          {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <AlertCircle size={16} /> {error}
              </div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all mt-4 shadow-lg shadow-purple-500/20 dark:shadow-purple-900/20">
            Log in <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-zinc-900 dark:text-white font-medium hover:underline">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
};
