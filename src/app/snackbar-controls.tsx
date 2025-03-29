'use client';

import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { Position, useSnackbar } from './snackbar-context';

export const SnackbarControls = ({ onPositionChange }: { onPositionChange: (_position: Position) => void }) => {
  const { snackbar } = useSnackbar();
  const [position, setPosition] = useState('bottom-right');
  const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Whisper' }), 3000));

  const types = [
    { label: 'default', code: `snackbar("You have arrived at the Royal Museum");`, onClick: () => snackbar('You have arrived at the Royal Museum') },
    { label: 'info', code: `snackbar.info("Your mission is to steal the Yaz Diamond");`, onClick: () => snackbar.info('Your mission is to steal the Yaz Diamond') },
    { label: 'success', code: `snackbar.success("You successfully snuck past security");`, onClick: () => snackbar.success('You successfully snuck past security') },
    { label: 'warning', code: `snackbar.warning("You have 5m before the alarm is triggered");`, onClick: () => snackbar.warning('You have 5m before the alarm is triggered') },
    { label: 'error', code: `snackbar.error("Mission failed, you were spotted");`, onClick: () => snackbar.error('Mission failed, you were spotted') },
    { label: 'promise', code: `const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Whisper' }), 3000));\n\nsnackbar.promise(promise(), {\n\tloading: { message: 'On route to the police station...' },\n\tsuccess: {\n\t\tmessage: 'You have arrived at the police station',\n\t\toptions: { icon: <ShieldIcon />, duration: 3000 },\n\t},\n\terror: { message: 'The cruiser got a flat tire!' },\n});`, onClick: () => snackbar.promise(promise(), { loading: { message: 'On route to the police station...' }, success: { message: 'You have arrived at the police station', options: { icon: <ShieldIcon />, duration: 3000 } }, error: { message: 'The cruiser got a flat tire!' } }) },
    { label: 'clear', code: `snackbar.clear();`, onClick: () => snackbar.clear() },
  ];

  const options = [
    { label: 'icon', code: `snackbar("You await your fate in an interrogation room", {\n\ticon: <ClockIcon />,\n});`, onClick: () => snackbar('You await your fate in an interrogation room', { icon: <ClockIcon /> }) },
    { label: 'description', code: `snackbar.info("Your lawyer has arrived", {\n\tdescription: "Saul Goodman will be representing you",\n});`, onClick: () => snackbar.info('Your lawyer has arrived', { description: 'Saul Goodman will be representing you' }) },
    { label: 'action', code: `snackbar("You have pleaded guilty", {\n\taction: { label: 'Undo', onClick: () => {} },\n});`, onClick: () => snackbar('You have pleaded guilty', { action: { label: 'Undo', onClick: () => {} }})},
    { label: 'dismissable', code: `snackbar.warning("You were sentenced to 10 years in prison", {\n\tdismissable: true,\n});`, onClick: () => snackbar.warning('You were sentenced to 10 years in prison', { dismissable: true }) },
    { label: 'duration', code: `snackbar("Transporting", {\n\tdescription: 'You are being transported to Guantanamo Bay...',\n\tduration: 50000,\n\tdismissable: true,\n});`, onClick: () => snackbar('Transporting', { description: 'You are being transported to Guantanamo Bay...', duration: 50000, dismissable: true }) },
    { label: 'promise', code: `const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Whisper' }), 3000));\n\nsnackbar.promise(promise(), {\n\tloading: { type: 'info', message: 'Driving back to the shore...' },\n\tsuccess: {\n\t\ttype: 'info',\n\t\tmessage: 'You have arrived at the shore',\n\t\toptions: { duration: 2000 },\n\t},\n});`, onClick: () => snackbar.promise(promise(), { loading: { type: 'info', message: 'Driving back to the shore...' }, success: { type: 'info', message: 'You have arrived at the shore', options: { duration: 2000 } }}) },
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
        <pre>
          <code className="block rounded-md bg-zinc-100 px-3 py-2.5 text-sm">
            {`const { snackbar } = useSnackbar();`}
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
            <button className="whitespace-nowrap rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-50 active:bg-zinc-100" key={type.label} onClick={() => { setSelectedType(type); type.onClick(); }}>{type.label}</button>
          ))}
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap">
          <code className="block rounded-md bg-zinc-100 px-3 py-2.5 text-sm">
            {selectedType.code}
          </code>
        </pre>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold">Options</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {options.map((option) => (
            <button className="whitespace-nowrap rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-50 active:bg-zinc-100" key={option.label} onClick={() => { setSelectedOption(option); option.onClick(); }}>{option.label}</button>
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
            <button className="whitespace-nowrap rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-50 active:bg-zinc-100" key={position} onClick={() => handlePositionChange(position)}>{position}</button>
          ))}
        </div>
        <code className="block rounded-md bg-zinc-100 px-3 py-2.5 text-sm">
          {`<SnackbarProvider maxSnacks={6} position="${position}">`}
        </code>
      </div>
    </div>
  );
};

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
    <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.75Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
  </svg>
);
