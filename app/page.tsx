'use client'

import { useState, useEffect } from 'react'
import { HfInference } from '@huggingface/inference'

// Initialize Hugging Face inference (make sure to set up your .env.local file)
const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)

export default function Home() {
	const [input, setInput] = useState('')
	const [typingResponse, setTypingResponse] = useState('')
	const [loading, setLoading] = useState(false)

	const typeResponse = (text: string) => {
	  let i = 0;
	  setTypingResponse('');
	  const typingInterval = setInterval(() => {
		if (i < text.length) {
		  setTypingResponse(prev => prev + text.charAt(i));
		  i++;
		} else {
		  clearInterval(typingInterval);
		}
	  }, 30);
	}

	const generateResponse = async () => {
	  setLoading(true)
	  try {
		const prompt = `Write a professional, well-formatted customer support email for this issue:
		"${input}"
		
		Include:
		1. Greeting: "Dear Valued Customer,"
		2. Acknowledge the issue
		3. Provide a clear solution or next steps
		4. Offer further assistance
		5. Sign off: "Best regards,\\nCustomer Support Team"

		Ensure proper paragraph spacing and formatting.`;

		const result = await hf.textGeneration({
		  model: 'gpt2-large',
		  inputs: prompt,
		  parameters: {
			max_length: 500,
			temperature: 0.5,
			top_k: 50,
			top_p: 0.95,
		  },
		});

		let processedResponse = result.generated_text.replace(prompt, '').trim();
		processedResponse = processedResponse.replace(/^[^A-Za-z]+/, '');
		processedResponse = processedResponse.replace(/\b(resentCancel|Cancel the request).*$/gm, '');
		processedResponse = processedResponse.split('\n').map(line => line.trim()).filter(Boolean).join('\n\n');
		
		if (!processedResponse.toLowerCase().startsWith('dear')) {
		  processedResponse = `Dear Valued Customer,\n\n${processedResponse}`;
		}
		
		if (!processedResponse.toLowerCase().includes('best regards')) {
		  processedResponse += '\n\nBest regards,\nCustomer Support Team';
		}

		typeResponse(processedResponse);
	  } catch (error) {
		console.error('Error generating response:', error)
		setTypingResponse('An error occurred while generating the response. Please try again.')
	  }
	  setLoading(false)
	}

	return (
		<main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
		  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
			<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
			<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			  <div className="max-w-md mx-auto">
				<h1 className="text-2xl font-semibold mb-6">Customer Support Email Generator</h1>
				<textarea
				  className="w-full px-3 py-2 border rounded-lg focus:outline-none custom-textarea"
				  rows={4}
				  value={input}
				  onChange={(e) => setInput(e.target.value)}
				  placeholder="Describe the customer's issue..."
				/>
				<button
				  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				  onClick={generateResponse}
				  disabled={loading}
				>
				  {loading ? 'Generating...' : 'Generate Response'}
				</button>
				{typingResponse && (
  					<div className="mt-6">
						<h2 className="text-lg font-semibold mb-2">Generated Response:</h2>
						<p className="text-gray-700 whitespace-pre-wrap">{typingResponse}</p>
					</div>
				)}
			  </div>
			</div>
		  </div>
		</main>
	)
}

