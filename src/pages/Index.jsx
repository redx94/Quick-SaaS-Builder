import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">P vs NP Problem</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            The P vs NP problem is one of the most important unsolved problems in computer science and mathematics.
          </p>
          <h2 className="text-xl font-semibold mb-2">What is P=NP?</h2>
          <p className="mb-4">
            P=NP is a question about whether every problem whose solution can be quickly verified by a computer can also be solved quickly by a computer.
          </p>
          <h2 className="text-xl font-semibold mb-2">Why is it important?</h2>
          <ul className="list-disc list-inside mb-4">
            <li>If P=NP is true, it would revolutionize computing and have profound implications for cryptography.</li>
            <li>It would mean that many difficult problems could be solved much more efficiently than we currently can.</li>
            <li>However, most experts believe that P≠NP, although this hasn't been proven.</li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            Note: The P=NP problem remains unsolved, and no proof currently exists.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;