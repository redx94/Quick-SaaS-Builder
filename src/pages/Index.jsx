import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">The P vs NP Problem</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="warning" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Unsolved Problem</AlertTitle>
            <AlertDescription>
              The P vs NP problem remains one of the most important unsolved problems in computer science and mathematics.
            </AlertDescription>
          </Alert>
          
          <h2 className="text-2xl font-semibold mb-2">What is P vs NP?</h2>
          <p className="mb-4">
            P vs NP is a question about the relationship between two classes of problems:
          </p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li><strong>P</strong> (polynomial time): Problems that can be solved quickly by a computer.</li>
            <li><strong>NP</strong> (nondeterministic polynomial time): Problems whose solutions can be quickly verified by a computer.</li>
          </ul>
          <p className="mb-4">
            The question is: Are these two classes actually the same? In other words, can every problem whose solution can be quickly verified also be solved quickly?
          </p>

          <h2 className="text-2xl font-semibold mb-2">Why is it important?</h2>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>If P=NP is true, it would revolutionize computing and have profound implications for cryptography.</li>
            <li>Many difficult problems in various fields could be solved much more efficiently.</li>
            <li>However, most experts believe that P≠NP, although this hasn't been proven.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">Why is it so hard to solve?</h2>
          <p className="mb-4">
            The difficulty lies in proving a negative: showing that no fast algorithm exists for NP-complete problems. This requires proving that out of an infinite number of possible algorithms, none can solve these problems quickly.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Hypothetical Scenario: If P=NP were true</h2>
          <p className="mb-4">
            If P=NP were proven true, here's what might happen:
          </p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>Many forms of encryption would become easily breakable.</li>
            <li>Optimization problems in logistics, finance, and science would become much easier to solve.</li>
            <li>Artificial Intelligence could potentially make huge leaps forward.</li>
            <li>The nature of mathematical proof and creativity might be fundamentally changed.</li>
          </ul>

          <p className="text-sm text-gray-600 italic">
            Note: Despite many attempts, no one has yet found a solution to the P vs NP problem. It remains one of the greatest challenges in computer science and mathematics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;