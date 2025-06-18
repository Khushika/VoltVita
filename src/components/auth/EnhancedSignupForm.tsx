
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuthStore } from '../../stores/authStore';
import { toast } from '../../hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Chrome, Apple, Check, X } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';

const EnhancedSignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { signup, loginWithGoogle, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    strength = Object.values(checks).filter(Boolean).length;
    return { strength: (strength / 5) * 100, checks };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    if (passwordStrength.strength < 60) {
      toast({
        title: "Weak Password",
        description: "Please use a stronger password with mixed case, numbers, and special characters",
        variant: "destructive",
      });
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.fullName);
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account",
      });
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
    } catch (error: any) {
      toast({
        title: "Google signup failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">
          Create Account
        </CardTitle>
        <p className="text-muted-foreground">
          Join us to get started
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Social Signup Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 hover:bg-gray-50"
            onClick={handleGoogleSignup}
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
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                required
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
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                required
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
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Password strength:</span>
                  <span className={`font-medium ${
                    passwordStrength.strength < 40 ? 'text-red-500' : 
                    passwordStrength.strength < 70 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {getStrengthText(passwordStrength.strength)}
                  </span>
                </div>
                <Progress 
                  value={passwordStrength.strength} 
                  className="h-2"
                />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(passwordStrength.checks).map(([key, isValid]) => (
                    <div key={key} className={`flex items-center space-x-1 ${isValid ? 'text-green-600' : 'text-red-500'}`}>
                      {isValid ? <Check size={12} /> : <X size={12} />}
                      <span>
                        {key === 'length' && '8+ characters'}
                        {key === 'lowercase' && 'Lowercase'}
                        {key === 'uppercase' && 'Uppercase'}
                        {key === 'number' && 'Number'}
                        {key === 'special' && 'Special char'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-sm text-red-500 flex items-center space-x-1">
                <X size={12} />
                <span>Passwords do not match</span>
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSignupForm;
