'use client';

import { useEffect } from "react";
import { useSnackbar } from "./snackbar-context";

export const SnackbarControls = () => {
  const { addSnackbar } = useSnackbar();

  useEffect(() => {
    addSnackbar("Wipe your shoes before entering", "error", 50000);
    addSnackbar("Wipe your shoes before entering", "warning", 50000);
    addSnackbar("Wipe your shoes before entering", "success", 50000);
    addSnackbar("Wipe your shoes before entering", "info", 50000);
    addSnackbar("Wipe your shoes before entering", "default", 50000);
  }, [])

  return (
    <button onClick={() => addSnackbar("Wipe your shoes before entering")}>
      Show Snackbar
    </button>
  );
};
