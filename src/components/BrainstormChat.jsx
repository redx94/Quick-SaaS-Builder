import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBrainstormResponse } from '../utils/brainstormResponses';

const BrainstormChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Initial greeting message
    setMessages([
      {
        text: "Hey bestie! 🎉 I'm so excited to help you brainstorm your amazing SaaS idea! What kind of product are you dreaming up? Let's make it awesome together!",
        sender: 'ai'
      }
    ]);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      setTimeout(() => {
        const aiResponse = getBrainstormResponse(input, messages);
        setMessages(prev => [...prev, { text: aiResponse.message, sender: 'ai' }]);
        if (aiResponse.isComplete) {
          setIsComplete(true);
        }
      }, 1000);
    }
  };

  const handleSubmitPlan = () => {
    setMessages(prev => [
      ...prev,
      {
        text: "Awesome job, bestie! 🌟 Your SaaS plan is looking incredible! I've submitted it to our team, and you're now on our exclusive waitlist. Keep an eye on your inbox – if your idea catches our eye, you might just get early access and a chance to build it for free! Either way, we'll be in touch soon with next steps. You're gonna do great things! 💪✨",
        sender: 'ai'
      }
    ]);
  };

  return (
    <Card className="fixed inset-4 flex flex-col bg-white shadow-xl rounded-lg overflow-hidden">
      <CardContent className="flex flex-col h-full p-4">
        <ScrollArea className="flex-grow mb-4 pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-3 rounded-lg ${
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
            placeholder="Share your ideas..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow mr-2"
            disabled={isComplete}
          />
          <Button onClick={handleSend} disabled={isComplete}>Send</Button>
        </div>
        {isComplete && (
          <Button onClick={handleSubmitPlan} className="mt-4 bg-green-500 hover:bg-green-600">
            Submit My SaaS Plan!
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BrainstormChat;