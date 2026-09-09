import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { errorMessage } from "../lib/format";

const HISTORY_LIMIT = 48;

export function useSlot(intervalMs = 2000) {
  const { connection } = useConnection();
  const [slot, setSlot] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const tick = async () => {
      try {
        const next = await connection.getSlot("confirmed");
        if (cancelled) return;
        setSlot(next);
        setUpdatedAt(Date.now());
        setError(null);
        setHistory((current) => [...current.slice(-(HISTORY_LIMIT - 1)), next]);
      } catch (error) {
        if (!cancelled) {
          setError(errorMessage(error, "Cookie RPC did not return a slot"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void tick();
    const timer = window.setInterval(() => {
      void tick();
    }, intervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [connection, intervalMs]);

  return { slot, error, updatedAt, history, loading };
}
