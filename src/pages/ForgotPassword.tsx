
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd make an API call to your backend
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // if (!response.ok) throw new Error('Failed to send password reset link');
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send reset link. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
            <p className="text-muted-foreground mt-2">
              {isSubmitted
                ? "Please check your email for recovery instructions"
                : "Enter your email to receive a password reset link"}
            </p>
          </div>
          
          <div className="glass-card p-8 animate-scale-in">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-muted-foreground">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 form-input"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="bg-primary/10 text-primary p-4 rounded-lg">
                  <p>
                    We've sent a password reset link to <strong>{email}</strong>. 
                    Please check your inbox (and spam folder) for further instructions.
                  </p>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full"
                >
                  Try another email
                </Button>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-sm text-primary hover:underline inline-flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
