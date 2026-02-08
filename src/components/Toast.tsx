"use client";

export type ToastVariant = "default" | "success" | "info";

interface ToastProps {
  message: string;
  visible: boolean;
  variant?: ToastVariant;
}

const variantClasses: Record<ToastVariant, string> = {
  default: "bg-brand-primary text-white",
  success: "bg-success text-white",
  info: "bg-brand-primary/90 text-white",
};

export function Toast({ message, visible, variant = "default" }: ToastProps) {
  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 animate-[slide-up_0.3s_ease-out] rounded-2xl px-6 py-4 shadow-elevated ${variantClasses[variant]}`}
      role="status"
      aria-live="polite"
    >
      <p className="text-center text-sm font-medium">{message}</p>
    </div>
  );
}
