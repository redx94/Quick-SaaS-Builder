import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Configure axios for development
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    httpsAgent: process.env.NODE_ENV === 'development' ? {
      rejectUnauthorized: false
    } : undefined
  });

  const generateIdea = async (userInput) => {
    const response = await axiosInstance.post('/generate_idea', { input: userInput });
    return response.data;
  };

  const mutation = useMutation(generateIdea, {
    onSuccess: (data) => {
      setMessages(prev => [...prev, { text: data.response, sender: 'ai' }]);
    },
    onError: (error) => {
      console.error('Error generating idea:', error);
      toast.error('An error occurred. Please try again.');
      setMessages(prev => [...prev, { text: 'Sorry, an error occurred. Please try again.', sender: 'ai' }]);
    },
  });

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      mutation.mutate(input);
      setInput('');
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col shadow-lg">
      <CardContent className="flex flex-col h-full p-4">
        <ScrollArea className="flex-grow mb-4 pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}>
                {message.text}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow mr-2"
          />
          <Button onClick={handleSend} disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Thinking...' : 'Send'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;