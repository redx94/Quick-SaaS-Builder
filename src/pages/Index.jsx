import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Code, Bot, Cloud, CreditCard, Users, Megaphone } from "lucide-react";

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
            title="AI-Powered Chat Interface"
            description="Our intelligent AI guides you through the entire process, from idea generation to deployment."
          />
          <FeatureCard
            icon={<Code className="h-8 w-8 text-green-500" />}
            title="Full-Stack SaaS Builder"
            description="Build both frontend and backend with our intuitive interface and pre-built templates."
          />
          <FeatureCard
            icon={<Cloud className="h-8 w-8 text-purple-500" />}
            title="Comprehensive Infrastructure"
            description="Automated setup of cloud infrastructure, APIs, databases, and CI/CD pipelines."
          />
          <FeatureCard
            icon={<CreditCard className="h-8 w-8 text-red-500" />}
            title="Integrated Payment Systems"
            description="Seamlessly handle transactions with built-in payment portals and financial management tools."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-yellow-500" />}
            title="User Account Management"
            description="Robust user authentication, authorization, and profile management systems."
          />
          <FeatureCard
            icon={<Megaphone className="h-8 w-8 text-indigo-500" />}
            title="Marketing & Customer Engagement"
            description="Built-in tools for marketing, advertising, and managing customer interactions."
          />
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg"
            onClick={handleGetStarted}
          >
            Get Started Now
          </Button>
        </div>
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