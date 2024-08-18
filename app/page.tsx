'use client'

import { useState } from 'react'
import { HfInference } from '@huggingface/inference'

// Initialize Hugging Face inference (make sure to set up your .env.local file)
const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)

export default function Home() {
	const [input, setInput] = useState('')
	const [response, setResponse] = useState('')
	const [loading, setLoading] = useState(false)

	const generateResponse = async () => {
		setLoading(true)
		try {
			const prompt = `
			Generate a polite and helpful customer support email for the following issue:
			"${input}"

			The email should:
			1. Start with a polite greeting
			2. Acknowledge the customer's issue
			3. Provide a clear and helpful solution or next steps
			4. Offer further assistance if needed
			5. End with a professional sign-off

			Email:
			`

			const result = await hf.textGeneration({
		  		model: 'gpt2-large', // Using a larger model for better results
				inputs: prompt,
				parameters: {
					max_length: 350, // Increased length to allow for a more detailed response
					num_return_sequences: 1,
					temperature: 0.7, // Adjust temp for more creative responses
					top_k: 50,
					top_p: 0.95,
				},
			})
		
			// Basic post-processing
			let processedResponse = result.generated_text.replace(prompt, '').trim()
			if (!processedResponse.toLowerCase().startsWith('dear') && !processedResponse.toLowerCase().startsWith('hello')) {
			  processedResponse = `Dear Valued Customer,\n\n${processedResponse}`
			}
		
			setResponse(processedResponse)

		} catch (error) {
			console.error('Error generating response:', error)
			setResponse('An error occurred while generating the response. Please try again.')
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
				{response && (
				  <div className="mt-6">
					<h2 className="text-lg font-semibold mb-2">Generated Response:</h2>
					<p className="text-gray-700 whitespace-pre-wrap">{response}</p>
				  </div>
				)}
			  </div>
			</div>
		  </div>
		</main>
	)
}

