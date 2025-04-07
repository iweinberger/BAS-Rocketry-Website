'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe 
          src="https://www.youtube.com/embed/bvim4rsNHkQ?autoplay=1&mute=1&controls=0&loop=1&playlist=bvim4rsNHkQ" 
          title="How Not to Land an Orbital Rocket Booster"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center bg-black bg-opacity-70">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-white">Houston, we have a problem!</h2>
          <p className="mb-8 text-lg text-white">The page you're looking for has crashed and burned (like some of these rockets).</p>
          <div className="space-y-4">
            <p className="text-gray-300">Choose your next mission:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-opacity-90 transition-all"
              >
                Return to Base
              </Link>
              <Link 
                href="/projects" 
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-primary transition-all"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 