'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { X } from 'lucide-react';

const DEFAULT_MAX_SNACKS = 6;
const DEFAULT_DURATION = 6000;

const DEFAULT_ICONS: Record<SnackType, ReactNode> = {
  'success': <CheckCircleIcon className="size-5" />,
  'warning': <ExclamationTriangleIcon className="size-5" />,
  'error': <XCircleIcon className="size-5" />,
  'info': <InformationCircleIcon className="size-5" />,
  'default': null,
}

const POSITION_CLASSES: Record<Position, string> = {
  'bottom-left': 'bottom-6 left-6',
  'bottom-center': 'bottom-6 inset-x-0 mx-auto',
  'bottom-right': 'bottom-6 right-6',
  'top-left': 'top-6 left-6',
  'top-center': 'top-6 inset-x-0 mx-auto',
  'top-right': 'top-6 right-6',
}

type SnackType = 'success' | 'warning' | 'error' | 'info' | 'default';
type Position = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right';

interface Snack {
  id: string;
  message: string;
  type?: SnackType;
  duration?: number;
  description?: string;
  icon?: ReactNode;
  dismissable?: boolean;
}

interface SnackOptions {
  duration?: number;
  description?: string;
  icon?: ReactNode;
  dismissable?: boolean;
}

interface SnackbarContextType {
  snackbar: {
    (message: string, options?: SnackOptions): void;
    success: (message: string, options?: SnackOptions) => void;
    error: (message: string, options?: SnackOptions) => void;
    info: (message: string, options?: SnackOptions) => void;
    warning: (message: string, options?: SnackOptions) => void;
  };
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
  maxSnacks?: number;
  position?: Position;
}

export const SnackbarProvider = ({ children, maxSnacks = DEFAULT_MAX_SNACKS, position = 'bottom-right' }: SnackbarProviderProps) => {
  const [snacks, setSnacks] = useState<Snack[]>([]);

  const createSnack = useCallback(
    (message: string, type: Snack['type'] = 'default', options: SnackOptions = {}) => {
      const { duration = DEFAULT_DURATION, icon = null, description, dismissable = true } = options;
      const id = crypto.randomUUID();

      const positionIsTop = position.startsWith('top');

      setSnacks((prev) => {
        const newSnack = { id, message, type, duration, description, icon: icon ?? DEFAULT_ICONS[type], dismissable };
        return positionIsTop ? [...prev, newSnack] : [newSnack, ...prev];
      });
  
      
      setTimeout(() => {
        setSnacks((prev) => prev.filter((snack) => snack.id !== id));
      }, duration);
    }, []);

  const snackbar = Object.assign(
    (message: string, options?: SnackOptions) => createSnack(message, 'default', options),
    {
      success: (message: string, options?: SnackOptions) => createSnack(message, 'success', options),
      warning: (message: string, options?: SnackOptions) => createSnack(message, 'warning', options),
      error: (message: string, options?: SnackOptions) => createSnack(message, 'error', options),
      info: (message: string, options?: SnackOptions) => createSnack(message, 'info', options),
    }
  );

  return (
    <SnackbarContext.Provider value={{ snackbar }}>
      {children}
      <SnackbarContainer snacks={snacks} setSnacks={setSnacks} position={position} maxSnacks={maxSnacks} />
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
  snacks,
  setSnacks,
  position,
  maxSnacks,
}: {
  snacks: Snack[];
  setSnacks: React.Dispatch<React.SetStateAction<Snack[]>>;
  position: Position;
  maxSnacks: number;
}) => {
  const positionIsTop = position.startsWith('top');
  const y = positionIsTop ? -50 : 50;

  const getOpacity = (index: number) => {
    if (positionIsTop) {
      return snacks.length - index > maxSnacks ? 0 : 1;
    } else {
      return index >= maxSnacks - 1 ? 0 : 1;
    }
  }

  return (
    <motion.div layout className={`fixed flex flex-col-reverse space-y-4 space-y-reverse w-[calc(100vw-3rem)] sm:w-[22.25rem] ${POSITION_CLASSES[position]}`}>
      <AnimatePresence>
        {snacks.map(({ id, message, description, type, icon, dismissable }, index) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y, scale: 0.98 }}
            animate={{ opacity: getOpacity(index), y: 0, scale: 1.0, display: getOpacity(index) ? 'block' : 'none' }}
            exit={{ opacity: 0, y, scale: 1.0 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className={`relative text-sm font-medium p-3 rounded-lg shadow-lg w-full ${
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
            style={{ zIndex: snacks.length - index }}
          >
            <div className="flex items-center justify-between gap-3">
              {icon && (
                <span className="shrink-0">
                  {icon}
                </span>
              )}
              <div className={`flex flex-col gap-0.5 grow ${type === 'default' ? 'ml-0.5' : ''}`}>
                <span className={`${description ? 'font-[550]' : ''}`}>{message}</span>
                {description && (<span>{description}</span>)}
              </div>
              {dismissable && (
                <button onClick={() => setSnacks((prev) => prev.filter((snack) => snack.id !== id))}>
                  <X className="size-4" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
