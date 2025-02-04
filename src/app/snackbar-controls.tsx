'use client';

import { useEffect } from "react";
import { useSnackbar } from "./snackbar-context";
import { Footprints } from "lucide-react";

export const SnackbarControls = () => {
  const { snackbar } = useSnackbar();

  useEffect(() => {
    snackbar.error("Wipe your shoes before entering", { duration: 50000 });
    snackbar.warning("Wipe your shoes before entering", { duration: 50000 });
    snackbar.success("Wipe your shoes before entering", { duration: 50000, icon: <Footprints className="size-5" /> });
    snackbar.info("Wipe your shoes before entering", { duration: 50000, dismissable: false });
    snackbar.info("Wipe your shoes before entering", { description: 'My persian rug is very expensive. Please be careful.', duration: 50000 });
    snackbar("Wipe your shoes before entering", { duration: 50000 });
  }, [])

  return (
    <button onClick={() => snackbar.info("Wipe your shoes before entering")}>
      Show Snackbar
    </button>
  );
};
