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

  const timers = useState(() => new Map<string, number>())[0];

  const push = useCallback(
    ({ ttlMs = 5200, ...input }: PushToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((current) => [...current, { ...input, id }]);
      const previous = timers.get(id);
      if (previous) window.clearTimeout(previous);
      timers.set(
        id,
        window.setTimeout(() => {
          timers.delete(id);
          dismiss(id);
        }, ttlMs),
      );
      return id;
    },
    [dismiss, timers],
  );

  return { toasts, push, dismiss };
}
