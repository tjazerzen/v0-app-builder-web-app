import V0Chat from '../components/V0Chat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to V0 App Builder</h1>
      <V0Chat />
    </main>
  );
}
