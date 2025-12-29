import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and email.",
        variant: "destructive"
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    login(name.trim(), email.trim());
    toast({
      title: isSignUp ? "Welcome aboard!" : "Welcome back!",
      description: `Great to have you, ${name}!`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent shadow-glow animate-pulse-soft">
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                NutriOrder
              </h1>
              <p className="text-muted-foreground mt-2">
                Eat smart. Live better.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Health Scores</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Smart Filters</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-xl bg-card border-border text-base px-5 focus:border-primary transition-colors"
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-xl bg-card border-border text-base px-5 focus:border-primary transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="xl"
              className="w-full"
            >
              {isSignUp ? 'Create Account' : 'Continue'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center text-muted-foreground text-sm">
            {isSignUp ? 'Already have an account?' : "New here?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-semibold hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="h-32 bg-gradient-to-t from-primary/5 to-transparent" />
    </div>
  );
};

export default Auth;
