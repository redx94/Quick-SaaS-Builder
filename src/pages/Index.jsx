import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Code, Bot, Cloud } from "lucide-react";

const Index = () => {
  const handleGetStarted = () => {
    // TODO: Implement get started functionality
    console.log("Get Started clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Quick SaaS Builder</h1>
          <p className="text-xl text-gray-600">Create, deploy, and manage high-profit SaaS applications without writing any code.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Bot className="h-8 w-8 text-blue-500" />}
            title="AI-Powered Chat Interface"
            description="Our intelligent AI guides you through the entire process, from idea generation to deployment."
          />
          <FeatureCard
            icon={<Code className="h-8 w-8 text-green-500" />}
            title="No-Code SaaS Builder"
            description="Drag-and-drop interface with pre-built templates for easy customization of your SaaS application."
          />
          <FeatureCard
            icon={<Cloud className="h-8 w-8 text-purple-500" />}
            title="Automated Infrastructure"
            description="Seamless setup of cloud infrastructure, Kubernetes orchestration, and CI/CD pipelines."
          />
          <FeatureCard
            icon={<Rocket className="h-8 w-8 text-red-500" />}
            title="One-Click Deployment"
            description="Deploy your SaaS application with a single click, including DNS setup and SSL configuration."
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