import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Toaster position="top-right" />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;