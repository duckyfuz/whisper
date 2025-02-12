'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Position, SnackbarProvider } from './snackbar-context';
import { SnackbarControls } from './snackbar-controls';

export default function Home() {
  const [position, setPosition] = useState<Position>('bottom-right');

  return (
    <SnackbarProvider position={position}>
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-16 bg-white p-8 pb-20 font-[family-name:var(--font-geist-sans)] text-zinc-800 sm:p-20">
        <header className="row-start-1 flex flex-wrap items-center justify-center gap-6">
          <h1 className="text-3xl font-semibold">Whisper</h1>
        </header>
        <main className="relative row-start-2 flex max-w-2xl flex-col items-center gap-8 sm:items-start">
          <SnackbarControls onPositionChange={(position) => setPosition(position)} />
        </main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
          <Link className="flex items-center gap-1" href="https://www.youtube.com/@farzany" target="_blank">
            <span>made with</span>
            <svg className="size-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span>by farzan</span>
          </Link>
        </footer>
      </div>
    </SnackbarProvider>
  );
}
