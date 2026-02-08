"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { Toast } from "@/components/Toast";
import type { ToastVariant } from "@/components/Toast";

type ToastState = {
  message: string;
  variant: ToastVariant;
  visible: boolean;
};

type ToastContextValue = {
  addToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 3500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    variant: "default",
    visible: false,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToast = useCallback((message: string, variant: ToastVariant = "default") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast({ message, variant, visible: true });
    timeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
      timeoutRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Toast
        message={toast.message}
        visible={toast.visible}
        variant={toast.variant}
      />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
