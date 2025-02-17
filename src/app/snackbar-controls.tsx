'use client';

import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { Position, useSnackbar } from './snackbar-context';

export const SnackbarControls = ({ onPositionChange }: { onPositionChange: (_position: Position) => void }) => {
  const [position, setPosition] = useState('bottom-right');
  const { snackbar } = useSnackbar();

  const types = [
    { label: 'default', code: `snackbar("You have arrived at the Royal Museum");`, onClick: () => snackbar('You have arrived at the Royal Museum') },
    { label: 'info', code: `snackbar.info("Your mission is to steal the Yaz Diamond");`, onClick: () => snackbar.info('Your mission is to steal the Yaz Diamond') },
    { label: 'success', code: `snackbar.success("You successfully snuck past security");`, onClick: () => snackbar.success('You successfully snuck past security') },
    { label: 'warning', code: `snackbar.warning("You have 5m before the alarm is triggered");`, onClick: () => snackbar.warning('You have 5m before the alarm is triggered') },
    { label: 'error', code: `snackbar.error("Mission failed, you were spotted");`, onClick: () => snackbar.error('Mission failed, you were spotted') },
    { label: 'clear', code: `snackbar.clear();`, onClick: () => snackbar.clear() },
  ];

  const options = [
    { label: 'description', code: `snackbar.info("Your lawyer has arrived", {\n\tdescription: "Saul Goodman will be representing you",\n});`, onClick: () => snackbar.info('Your lawyer has arrived', { description: 'Saul Goodman will be representing you' }) },
    { label: 'action', code: `snackbar("You have pleaded guilty", {\n\taction: { label: 'Undo', onClick: () => {} },\n});`, onClick: () => snackbar('You have pleaded guilty', { action: { label: 'Undo', onClick: () => {} }})},
    { label: 'dismissable', code: `snackbar.warning("You were sentenced to 10 years in prison", {\n\tdismissable: true,\n});`, onClick: () => snackbar.warning('You were sentenced to 10 years in prison', { dismissable: true }) },
    { label: 'duration', code: `snackbar("Transporting", {\n\tdescription: 'You are being transported to Guantanamo Bay...',\n\tduration: 50000,\n\tdismissable: true,\n});`, onClick: () => snackbar('Transporting', { description: 'You are being transported to Guantanamo Bay...', duration: 50000, dismissable: true }) },
    { label: 'long', code: `snackbar("Countless dinghies and a chopper close in on your boat during transit. Seems like you have friends in high places. Your boat is turning around.", { duration: 10000 });`, onClick: () => snackbar('Countless dinghies and a chopper close in on your boat during transit. Seems like you have friends in high places. Your boat is turning around.', { duration: 10000 }) },
  ];

  const positions: Position[] = ['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right'];

  const handlePositionChange = useCallback((newPosition: Position) => {
    if (newPosition !== position) {
      snackbar.clear();
      setPosition(newPosition);
      onPositionChange(newPosition);
    }

    snackbar(`The snackbar position is ${newPosition}`);
  }, [onPositionChange, position, snackbar]);

  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="relative flex w-full flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold">Usage</h2>
        <p>
          Download the single file of code from the <Link className="text-blue-600 hover:underline" href="https://github.com/farzany/whisper/blob/main/src/app/snackbar-context.tsx" target="_blank">GitHub repository</Link>, add it to your project, and wrap your app with the context provider.
        </p>
        <pre>
          <code className="block rounded-md bg-zinc-100 px-3 py-2.5 text-sm">
            {`<SnackbarProvider>\n...\n</SnackbarProvider>`}
          </code>
        </pre>
        <p>
          You will also need to install the package dependencies.
        </p>
        <pre>
          <code className="block rounded-md bg-zinc-100 px-3 py-2.5 text-sm">
            {`npm install framer-motion\nnpm install tailwindcss`}
          </code>
        </pre>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold">Types</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {types.map((type) => (
            <button className="whitespace-nowrap rounded-md border border-zinc-300 px-3 py-1.5" key={type.label} onClick={() => { setSelectedType(type); type.onClick(); }}>{type.label}</button>
          ))}
        </div>
        <code className="block rounded-md bg-zinc-100 px-3 py-2.5 text-sm">
          {selectedType.code}
        </code>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold">Options</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {options.map((option) => (
            <button className="whitespace-nowrap rounded-md border border-zinc-300 px-3 py-1.5" key={option.label} onClick={() => { setSelectedOption(option); option.onClick(); }}>{option.label}</button>
          ))}
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap">
          <code className="block rounded-md bg-zinc-100 px-3 py-2.5 text-sm">
            {selectedOption.code}
          </code>
        </pre>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold">Positions</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {positions.map((position) => (
            <button className="whitespace-nowrap rounded-md border border-zinc-300 px-3 py-1.5" key={position} onClick={() => handlePositionChange(position)}>{position}</button>
          ))}
        </div>
        <code className="block rounded-md bg-zinc-100 px-3 py-2.5 text-sm">
          {`<SnackbarProvider maxSnacks={6} position="${position}">`}
        </code>
      </div>
    </div>
  );
};
