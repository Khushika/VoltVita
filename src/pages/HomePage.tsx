
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Shield, Smartphone, Calendar, FileText } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Warranty Tracking',
      description: 'Never miss warranty expiration dates with smart reminders',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Calendar size={32} />,
      title: 'Service Scheduling',
      description: 'Schedule and track maintenance services effortlessly',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: <FileText size={32} />,
      title: 'Digital Records',
      description: 'Store all appliance documents and receipts securely',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile Ready',
      description: 'Access your appliance data anywhere, anytime',
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
        <div className="absolute inset-0 indian-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Smart Appliance
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
                Management
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in">
              Take control of your home appliances with AppliCare. Track warranties, 
              schedule maintenance, and never worry about missing important dates again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 text-lg transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 text-lg transform hover:scale-105 transition-all duration-200"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AppliCare?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for Indian households, AppliCare simplifies 
              appliance management with intelligent features and beautiful design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Indian families who trust AppliCare to manage their home appliances
          </p>
          <Button
            onClick={() => navigate('/signup')}
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 text-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Managing Your Appliances
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
