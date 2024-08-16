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
	  const result = await hf.textGeneration({
		model: 'gpt2',
		inputs: `Generate a polite customer support email for the following issue: ${input}`,
		parameters: {
		  max_length: 200,
		  num_return_sequences: 1,
		},
	  })
	  setResponse(result.generated_text)
	} catch (error) {
	  console.error('Error generating response:', error)
	  setResponse('An error occurred while generating the response.')
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
			  className="w-full px-3 py-2 !text-gray-900 bg-white border rounded-lg focus:outline-none"
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

