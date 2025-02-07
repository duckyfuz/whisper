'use client';

import { useCallback, useState } from "react";
import { Position, useSnackbar } from "./snackbar-context";

export const SnackbarControls = ({ onPositionChange }: { onPositionChange: (position: Position) => void }) => {
  const [position, setPosition] = useState('bottom-right');
  const { snackbar } = useSnackbar();

  const types = [
    { label: 'default', code: `snackbar("You have arrived at the Royal Museum")`, onClick: () => snackbar("You have arrived at the Royal Museum") },
    { label: 'info', code: `snackbar.info("Your mission is to steal the Yaz Diamond")`, onClick: () => snackbar.info("Your mission is to steal the Yaz Diamond") },
    { label: 'success', code: `snackbar.success("You successfully snuck past security")`, onClick: () => snackbar.success("You successfully snuck past security") },
    { label: 'warning', code: `snackbar.warning("You have 5m before the alarm is triggered")`, onClick: () => snackbar.warning("You have 5m before the alarm is triggered") },
    { label: 'error', code: `snackbar.error("Mission failed, you were spotted")`, onClick: () => snackbar.error("Mission failed, you were spotted") },
    { label: 'clear', code: `snackbar.clear()`, onClick: () => snackbar.clear() },
  ]

  const options = [
    { label: 'description', code: `snackbar.info("Your lawyer has arrived", { description: "Saul Goodman will be representing you" })`, onClick: () => snackbar.info("Your lawyer has arrived", { description: "Saul Goodman will be representing you" }) },
    { label: 'action', code: `snackbar("You have pleaded guilty", { action: { label: 'Undo', onClick: () => {} }})`, onClick: () => snackbar("You have pleaded guilty", { action: { label: 'Undo', onClick: () => {} }})},
    { label: 'dismissable', code: `snackbar.warning("You were sentenced to 10 years in prison", { dismissable: true })`, onClick: () => snackbar.warning("You were sentenced to 10 years in prison", { dismissable: true }) },
    { label: 'duration', code: `snackbar("Transporting", { description: 'You are being transported to Guantanamo Bay...', duration: 50000, dismissable: true })`, onClick: () => snackbar("Transporting", { description: 'You are being transported to Guantanamo Bay...', duration: 50000, dismissable: true }) },
  ]

  const positions: Position[] = ['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right']

  const handlePositionChange = useCallback((newPosition: Position) => {
    if (newPosition !== position) {
      snackbar.clear();
      setPosition(newPosition);
      onPositionChange(newPosition);
    }

    snackbar(`The snackbar position is ${newPosition}`);
  }, [onPositionChange, position, snackbar])

  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text">Types</h2>
        <div className="flex gap-3 text-sm flex-wrap">
          {types.map((type) => (
            <button className="whitespace-nowrap border-zinc-300 border rounded-md px-3 py-1.5" key={type.label} onClick={() => { setSelectedType(type); type.onClick(); }}>{type.label}</button>
          ))}
        </div>
        <code className="block bg-zinc-100 px-3 py-2.5 rounded-md text-sm">
          {selectedType.code}
        </code>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text">Options</h2>
        <div className="flex gap-3 text-sm flex-wrap">
          {options.map((option) => (
            <button className="whitespace-nowrap border-zinc-300 border rounded-md px-3 py-1.5" key={option.label} onClick={() => { setSelectedOption(option); option.onClick(); }}>{option.label}</button>
          ))}
        </div>
        <code className="block bg-zinc-100 px-3 py-2.5 rounded-md text-sm">
          {selectedOption.code}
        </code>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text">Positions</h2>
        <div className="flex gap-3 text-sm flex-wrap">
          {positions.map((position) => (
            <button className="whitespace-nowrap border-zinc-300 border rounded-md px-3 py-1.5" key={position} onClick={() => handlePositionChange(position)}>{position}</button>
          ))}
        </div>
        <code className="block bg-zinc-100 px-3 py-2.5 rounded-md text-sm">
          {`<SnackbarProvider maxSnacks={6} position="${position}">`}
        </code>
      </div>
    </div>
  );
};
