import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Scale, CheckCircle2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalName = name.trim() || 'Alex Johnson';
    const finalEmail = email.trim() || 'alex.johnson@example.com';

    login(finalName, finalEmail);
    toast.success(isSignUp ? `Welcome aboard, ${finalName}!` : `Welcome back, ${finalName}!`);
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    login('Health Enthusiast', 'demo@healthfulbites.app');
    toast.success("Welcome to your HealthfulBites Dashboard!");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-7 animate-fade-in">
          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white dark:bg-slate-800 p-3 shadow-xl border border-emerald-100 dark:border-slate-700">
              <img src="/logo.svg" alt="HealthfulBites Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Healthful<span className="text-emerald-600">Bites</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Smart nutrition scoring, brand comparison & diet assistant
              </p>
            </div>
          </div>

          {/* Features Badges */}
          <div className="flex items-center justify-center gap-2.5 text-xs flex-wrap">
            <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Health Scores</span>
            </div>
            <div className="flex items-center gap-1 text-teal-700 dark:text-teal-300 font-semibold bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-800">
              <Scale className="w-3.5 h-3.5" />
              <span>100g Brand Matrix</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-2.5">
              <Input
                type="text"
                placeholder="Your name (e.g. Alex Johnson)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-sm px-4 focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
              <Input
                type="email"
                placeholder="Email address (e.g. alex@example.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-sm px-4 focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <span>{isSignUp ? 'Create Health Profile' : 'Continue to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Access Button */}
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Guest Access</span>
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center text-slate-500 text-xs space-y-1">
            <p>
              {isSignUp ? 'Already have a profile?' : "New to HealthfulBites?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
            <p>
              <Link to="/search" className="text-slate-400 hover:text-emerald-600 hover:underline">
                or Browse 3M+ Foods Without Login →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="h-16 bg-gradient-to-t from-emerald-500/10 to-transparent" />
    </div>
  );
};

export default Auth;
