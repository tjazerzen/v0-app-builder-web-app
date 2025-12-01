import V0Chat from '../components/V0Chat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">Welcome to V0 App Builder</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Bring your ideas to life with AI</p>
      </div>
      <V0Chat />
    </main>
  );
}
