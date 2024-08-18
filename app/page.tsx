"use client";

import React, { useState } from 'react';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

export default function CustomerSupportGenerator() {
  const [customerName, setCustomerName] = useState('');
  const [issue, setIssue] = useState('');
  const [details, setDetails] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');

  const handleGenerateEmail = async () => {
    try {
      const prompt = `Customer Name: ${customerName}\nIssue: ${issue}\nDetails: ${details}\n\nGenerate a customer support email addressing the issue mentioned above.`;

      const result = await hf.textGeneration({
        model: 'gpt2',
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
        },
      });

      setGeneratedEmail(result.generated_text); // Update the state with the generated email
    } catch (error) {
      console.error('Error generating email:', error);
    }
  };

  return (
	<div className="font-sans text-gray-800 leading-relaxed max-w-lg mx-auto p-4 bg-gray-100">
      <h1 className="text-center text-2xl font-bold text-gray-800">Customer Support Email Generator</h1>
      <form id="emailForm" className="bg-white p-5 rounded-lg shadow-lg" onSubmit={(e) => { e.preventDefault(); handleGenerateEmail(); }}>
        <label htmlFor="customerName" className="block mb-1 font-bold text-gray-700">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        
        <label htmlFor="issueType" className="block mb-1 font-bold text-gray-700">Issue Type:</label>
        <select
          id="issueType"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
        >
          <option value="">Select an issue</option>
          <option value="technical">Technical Problem</option>
          <option value="billing">Billing Inquiry</option>
          <option value="account">Account Management</option>
          <option value="product">Product Information</option>
        </select>
        
        <label htmlFor="details" className="block mb-1 font-bold text-gray-700">Additional Details:</label>
        <textarea
          id="details"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          rows="4"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Generate Email</button>
      </form>
      
      {generatedEmail && (
        <div id="generatedEmail" className="bg-white border border-gray-300 rounded-md p-4 mt-5 whitespace-pre-wrap">
          {generatedEmail}
        </div>
      )}
    </div>
  );
}
