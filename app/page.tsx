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
	  // Determine the specific email template to use based on the issue type
	  const issueTemplates: { [key: string]: string } = {
		technical: `Dear ${customerName},

Thank you for contacting us regarding the technical issue you're facing. We understand how frustrating it can be, and we apologize for any inconvenience this may have caused.

Our technical team is already reviewing your case, and we will work diligently to resolve the issue as quickly as possible. In the meantime, any additional details you can provide will help us address the problem more efficiently:

${details}

Thank you for your patience and understanding. We will keep you updated on our progress. If you have any further questions, feel free to reach out.

Best regards,
Customer Support Team`,

		billing: `Dear ${customerName},

Thank you for reaching out regarding your billing inquiry. We understand the importance of this matter and will review your request as soon as possible.

We have noted the following details regarding your inquiry:

${details}

Please allow us 5-10 business days to process your request. We will ensure that any discrepancies are resolved swiftly.

Best regards,
Customer Support Team`,

		account: `Dear ${customerName},

Thank you for contacting us about your account management needs. We are here to help you with any issues you might have.

Based on the information you provided:

${details}

To proceed, could you please verify the following details for security purposes:
- Your account email address
- The last four digits of your registered phone number

Once we have this information, we can proceed with your request.

Best regards,
Customer Support Team`,

		product: `Dear ${customerName},

Thank you for your interest in our products. We are always eager to assist with any questions or information you may need.

Regarding your inquiry:

${details}

Please provide any additional information that might help us assist you better. We will get back to you with the most relevant details shortly.

Best regards,
Customer Support Team`,
	  };

	  // Use the corresponding template based on the selected issue type
	  const emailTemplate = issueTemplates[issue] || `Dear ${customerName},

Thank you for reaching out to us. We will review your inquiry and get back to you as soon as possible.

Best regards,
Customer Support Team`;

	  // Set the generated email
	  setGeneratedEmail(emailTemplate);

	} catch (error) {
	  console.error('Error generating email:', error);
	}
  };

  return (
	<div className="w-full">
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
