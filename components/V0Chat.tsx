'use client';

import { useState } from 'react';
import { Bot, ArrowRight } from 'lucide-react';

export default function V0Chat() {
  const [prompt, setPrompt] = useState("");
  const [demoUrl, setDemoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setDemoUrl(null);
    setError(null);

    try {
      const response = await fetch('/api/v0-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error from proxy: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const chat = await response.json();

      console.log('Full chat object:', chat);

      if (chat.demo) {
        setDemoUrl(chat.demo);
      } else {
        throw new Error("The API response did not include a demo URL.");
      }
    } catch (err: any) {
      console.error("Error creating v0 chat:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 p-4">
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="flex items-center w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-md focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 transition-shadow">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a landing page for a SaaS product with a pricing table"
            className="flex-grow w-full pl-6 py-4 text-lg bg-transparent border-none focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="mr-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-transform transform active:scale-95"
            disabled={isLoading || !prompt.trim()}
          >
            Build
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>

      {error && (
        <div className="w-1/2 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300 rounded-lg text-center">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading && (
        <div className="w-1/2 h-[600px] border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 rounded-lg overflow-hidden shadow-lg flex flex-col justify-center items-center animate-pulse">
            <div className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Building your app...
            </div>
            <p className="text-gray-400 dark:text-gray-500 mt-2">AI is generating the code, please wait.</p>
        </div>
      )}
      
      {demoUrl && (
        <div className="w-1/2 h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
          <iframe
            src={demoUrl}
            width="100%"
            height="100%"
            className="border-0"
            title="V0 App Preview"
          >
          </iframe>
        </div>
      )}
    </div>
  );
}
