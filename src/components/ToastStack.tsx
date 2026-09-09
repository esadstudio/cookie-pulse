import { useEffect } from "react";
import type { Toast } from "../hooks/useToasts";

type ToastStackProps = {
  toasts: Toast[];
  onDismiss: (id: string) => void;
};

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  useEffect(() => {
    for (const toast of toasts) {
      const node = document.getElementById(`toast-${toast.id}`);
      if (node && "showPopover" in node && typeof node.showPopover === "function") {
        try {
          node.showPopover();
        } catch {
          node.classList.add(":popover-open");
        }
      }
    }
  }, [toasts]);

  return (
    <div className="toast-region" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <article
          key={toast.id}
          id={`toast-${toast.id}`}
          className={`toast toast-${toast.tone}`}
          popover="manual"
          role="status"
        >
          <div>
            <strong>{toast.title}</strong>
            {toast.detail ? <p>{toast.detail}</p> : null}
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss status"
          >
            Close
          </button>
        </article>
      ))}
    </div>
  );
}
