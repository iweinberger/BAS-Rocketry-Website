// This is a Server Component file by default

import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Dynamically import the client component
const JotformEmbed = dynamic(() => import('./JotformEmbed'), { ssr: false });

export const metadata: Metadata = {
  title: 'Donate – BAS Rocketry',
  description: 'Support our team by making a donation.',
};

export default function DonatePage() {
  return (
    <>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <title>BAS Rocketry - Donate</title>
      </head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-6">Support BAS Rocketry</h1>
        <div className="w-full max-w-2xl">
          <JotformEmbed />
        </div>
      </main>
    </>
  );
}
