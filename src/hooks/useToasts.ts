import { useCallback, useState } from "react";

export type ToastTone = "info" | "ok" | "warn" | "error";

export type Toast = {
  id: string;
  tone: ToastTone;
  title: string;
  detail?: string;
};

type PushToastInput = Omit<Toast, "id"> & { ttlMs?: number };

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    ({ ttlMs = 5200, ...input }: PushToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((current) => [...current, { ...input, id }]);
      window.setTimeout(() => dismiss(id), ttlMs);
      return id;
    },
    [dismiss],
  );

  return { toasts, push, dismiss };
}
