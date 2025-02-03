'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { X } from 'lucide-react'

const MAX_LENGTH = 6;

interface SnackbarMessage {
  id: string;
  message: string;
  type?: 'default'| 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  startAdornment?: ReactNode | null;
}

interface SnackbarContextType {
  addSnackbar: (message: string, type?: SnackbarMessage['type'], duration?: number, startAdornment?: ReactNode | null) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const addSnackbar = useCallback(
    (message: string, type: SnackbarMessage['type'] = 'default', duration = 5000, startAdornment: ReactNode | null = null) => {
      const id = crypto.randomUUID();

      const defaultAdornment =
        startAdornment !== null
          ? startAdornment
          : type === 'success'
          ? <CheckCircleIcon className="size-5" />
          : type === 'error'
          ? <XCircleIcon className="size-5" />
          : type === 'warning'
          ? <ExclamationTriangleIcon className="size-5" />
          : type === 'info'
          ? <InformationCircleIcon className="size-5" />
          : null;

      setSnackbars((prev) => [{ id, message, type, duration, startAdornment: defaultAdornment }, ...prev]);

      setTimeout(() => {
        setSnackbars((prev) => prev.filter((snack) => snack.id !== id));
      }, duration);
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      {children}
      <SnackbarContainer snackbars={snackbars} setSnackbars={setSnackbars} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

const SnackbarContainer = ({
  snackbars,
  setSnackbars,
}: {
  snackbars: SnackbarMessage[];
  setSnackbars: React.Dispatch<React.SetStateAction<SnackbarMessage[]>>;
}) => {
  return (
    <motion.div layout className="fixed bottom-6 right-6 flex flex-col-reverse space-y-4 space-y-reverse">
      <AnimatePresence>
        {snackbars.map(({ id, message, type, startAdornment }, index) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: index >= MAX_LENGTH - 1 ? 0 : 1, y: 0, scale: 1.0 }}
            exit={{ opacity: 0, y: 50, scale: 1.0 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut", }}
            className={`relative text-sm font-medium p-3 rounded-lg shadow-lg ${
              type === "success"
                ? "text-green-700 bg-green-50 border-[#B6F0CA] border"
                : type === "error"
                ? "text-[#cb2321] bg-red-50 border-red-200 border"
                : type === "warning"
                ? "text-amber-700 bg-yellow-50 border-amber-200 border"
                : type === "info"
                ? "text-blue-600 bg-sky-50 border-blue-200 border"
                : "text-zinc-800 bg-white border-zinc-200 border"
            }`}
            style={{ zIndex: snackbars.length - index }}
          >
            <div className="flex items-center justify-between gap-3">
              {startAdornment}
              <span className={`grow ${type === 'default' ? 'ml-0.5' : ''}`}>{message}</span>
              <button
                onClick={() =>
                  setSnackbars((prev) => prev.filter((snack) => snack.id !== id))
                }
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

