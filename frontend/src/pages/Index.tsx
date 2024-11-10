import React from 'react';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-8">Quick SaaS Builder</h1>
      <p className="text-xl text-gray-600 mb-8">
        An AI-powered tool for creating SaaS solutions
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Fast Development</h2>
          <p className="text-gray-600">
            Build your SaaS application quickly with our modern tech stack
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">AI Integration</h2>
          <p className="text-gray-600">
            Leverage AI capabilities to enhance your application
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Scalable Architecture</h2>
          <p className="text-gray-600">
            Built with scalability in mind from the ground up
          </p>
        </div>
      </div>
    </div>
  );
}