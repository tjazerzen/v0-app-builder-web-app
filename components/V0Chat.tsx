'use client';

import { useEffect, useState } from 'react';

export default function V0Chat() {  
  const [demoUrl, setDemoUrl] = useState<string | null>(null);

  useEffect(() => {
    const createChat = async () => {
      try {
        const response = await fetch('/api/v0-proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: "Build an app that displays hello world" }),
        });

        if (!response.ok) {
          throw new Error(`Error from proxy: ${response.status} ${response.statusText}`);
        }

        const chat = await response.json();

        console.log('Full chat object:', chat);

        chat.files?.forEach((file: any) => {
          console.log('File Meta (filename):', file.meta.file); // Log the meta object to see its structure
          console.log(`Content\n\n: ${file.source}`)
        })

        if (chat.demo) {
          setDemoUrl(chat.demo);
        }
      } catch (error) {
        console.error("Error creating v0 chat:", error);
      }
    };

    createChat();
  }, []);

  if (!demoUrl) {
    return <div>Loading v0 app...</div>;
  }

  return (
    <iframe
      src={demoUrl}
      width="100%"
      height="600">
    </iframe>
  );
}
