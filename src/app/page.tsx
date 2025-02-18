'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Position, SnackbarProvider } from './snackbar-context';
import { SnackbarControls } from './snackbar-controls';

export default function Home() {
  const [position, setPosition] = useState<Position>('bottom-right');

  return (
    <SnackbarProvider position={position}>
      <div className="flex min-h-screen flex-col place-items-center gap-16 bg-white p-8 pb-20 pt-12 font-[family-name:var(--font-geist-sans)] text-zinc-800 sm:p-20">
        <Link href="https://github.com/farzany/whisper" target="_blank" className="absolute right-6 top-6">
          <GithubIcon />
        </Link>
        <header className="flex flex-col flex-wrap items-center justify-center gap-2">
          <h1 className="text-3xl font-semibold">Whisper</h1>
          <p className="text-lg font-medium text-zinc-700">React Snackbar Component</p>
        </header>
        <main className="relative flex max-w-2xl flex-col items-center gap-8 sm:items-start">
          <SnackbarControls onPositionChange={(position) => setPosition(position)} />
        </main>
        <footer className="flex flex-col flex-wrap items-center justify-center gap-2">
          <Link className="flex items-center gap-1" href="https://www.youtube.com/@farzany" target="_blank">
            <span>made with</span>
            <svg className="size-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span>by farzan</span>
          </Link>
          <p className="text-zinc-500">Inspired by Sonner by Emil Kowalski</p>
        </footer>
      </div>
    </SnackbarProvider>
  );
}

const GithubIcon = () => (
  <svg className="transition-all hover:-rotate-12 hover:scale-110 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
