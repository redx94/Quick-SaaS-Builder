import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import axios from 'axios';
import https from 'https';

const SocraticDebugger = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  // Configure axios with a custom HTTPS agent to bypass SSL verification in development
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false // Only for development, not safe for production
  });

  const debugMutation = useMutation(
    async (question: string) => {
      const response = await axios.post(
        'https://localhost:5000/ask_socratic', 
        { question },
        process.env.NODE_ENV === 'development' ? { httpsAgent } : {} // Use httpsAgent if in development
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        setResponse(data.answer);
        toast.success('Debug analysis complete');
      },
      onError: (error) => {
        console.error('Error in Socratic debugging:', error);
        toast.error('Failed to analyze code. Please try again.');
      },
    }
  );

  const handleDebug = () => {
    if (input.trim()) {
      debugMutation.mutate(input);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Socratic Code Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your code or describe the issue..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px]"
        />
        <Button 
          onClick={handleDebug}
          disabled={debugMutation.isLoading}
        >
          {debugMutation.isLoading ? 'Analyzing...' : 'Debug'}
        </Button>
        {response && (
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <pre className="whitespace-pre-wrap">{response}</pre>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default SocraticDebugger;
