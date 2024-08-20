import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Code, Bot, Cloud, CreditCard, Users, Megaphone } from "lucide-react";
import BrainstormChat from '../components/BrainstormChat';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleGetStarted = () => {
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Advanced SaaS Builder</h1>
          <p className="text-xl text-gray-600">Create, deploy, and manage comprehensive SaaS applications with our AI-powered platform.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Bot className="h-8 w-8 text-blue-500" />}
            title="AI-Powered Brainstorming"
            description="Our intelligent AI guides you through ideation and planning for your perfect SaaS product."
          />
          <FeatureCard
            icon={<Code className="h-8 w-8 text-green-500" />}
            title="Comprehensive SaaS Planning"
            description="Cover all aspects of your SaaS, from backend to marketing, ensuring no detail is overlooked."
          />
          <FeatureCard
            icon={<Cloud className="h-8 w-8 text-purple-500" />}
            title="Tailored Product Roadmap"
            description="Get a detailed plan and outline for your SaaS, ready for development and launch."
          />
          <FeatureCard
            icon={<CreditCard className="h-8 w-8 text-red-500" />}
            title="Early Access Opportunities"
            description="Chance to get your SaaS built and launched for free if your idea stands out."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-yellow-500" />}
            title="User-Centric Approach"
            description="Casual, fun 'bestie' interactions to make your SaaS planning experience enjoyable."
          />
          <FeatureCard
            icon={<Megaphone className="h-8 w-8 text-indigo-500" />}
            title="Exclusive Waitlist"
            description="Join our waitlist for the chance to be among the first to use our revolutionary platform."
          />
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg"
            onClick={handleGetStarted}
          >
            Start Brainstorming Now!
          </Button>
        </div>

        {showChat && <BrainstormChat />}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="flex items-center text-xl font-semibold">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default Index;