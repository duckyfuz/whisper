'use client';

import { useEffect } from "react";
import { useSnackbar } from "./snackbar-context";

export const SnackbarControls = () => {
  const { snackbar } = useSnackbar();

  useEffect(() => {
    snackbar.error("Wipe your shoes before entering", { duration: 50000 });
    snackbar.warning("Wipe your shoes before entering", { duration: 50000 });
    snackbar.info("Wipe your shoes before entering", { duration: 50000, dismissable: false });
    snackbar.info("Wipe your shoes before entering", { description: 'My persian rug is very expensive. Please be careful.', duration: 50000 });
    snackbar("Wipe your shoes before entering", { duration: 50000, action: { label: 'Undo', onClick: () => console.log('Clicked!')}, dismissable: false});
  }, [])

  return (
    <button onClick={() => snackbar.info("Wipe your shoes before entering")}>
      Show Snackbar
    </button>
  );
};
