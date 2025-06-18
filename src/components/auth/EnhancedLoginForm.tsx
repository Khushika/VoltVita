
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuthStore } from '../../stores/authStore';
import { toast } from '../../hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, Chrome, Apple } from 'lucide-react';
import { Separator } from '../ui/separator';

const EnhancedLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  
  const { login, loginWithGoogle, resetPassword, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error: any) {
      toast({
        title: "Google login failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail || !validateEmail(resetEmail)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      await resetPassword(resetEmail);
      toast({
        title: "Reset email sent",
        description: "Check your inbox for password reset instructions",
      });
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  if (showForgotPassword) {
    return (
      <Card className="w-full max-w-md mx-auto animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Reset Password
          </CardTitle>
          <p className="text-muted-foreground">
            Enter your email to receive reset instructions
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Email'}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">
          Welcome Back
        </CardTitle>
        <p className="text-muted-foreground">
          Sign in to your account
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 hover:bg-gray-50"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <Chrome className="h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 hover:bg-gray-50"
            disabled={true}
          >
            <Apple className="h-5 w-5" />
            <span>Continue with Apple (Coming Soon)</span>
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                required
                aria-describedby="email-error"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                required
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedLoginForm;
