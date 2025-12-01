import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Mail, Lock, User, Loader2 } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required").optional(),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      const data = isLogin 
        ? { email, password }
        : { email, password, name };
      authSchema.parse(data);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) {
            newErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Login failed",
              description: "Invalid email or password. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login failed",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }
        toast({
          title: "Welcome back! 🎉",
          description: "You've been logged in successfully.",
        });
        navigate("/dashboard");
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account exists",
              description: "An account with this email already exists. Try logging in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign up failed",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }
        toast({
          title: "Account created! 🎉",
          description: "Welcome to Poppy!",
        });
        navigate("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <span className="text-xl">💩</span>
              </div>
              <span className="text-xl font-bold text-foreground">Poppy</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome back!" : "Create your account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Log in to manage your popups"
                : "Start converting visitors into customers"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10"
                  />
                </div>
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
            </div>

            <Button type="submit" variant="default" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isLogin ? "Logging in..." : "Creating account..."}
                </>
              ) : (
                isLogin ? "Log in" : "Create account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-card items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        
        <div className="relative z-10 text-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-card border border-border animate-float">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Boost your conversions
            </h2>
            <p className="text-muted-foreground max-w-xs">
              Join thousands of website owners using Poppy to turn visitors into paying customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
