const LAMPORTS_PER_COOK = 1_000_000_000;

export function shortenAddress(value: string, visible = 4): string {
  if (value.length <= visible * 2 + 1) return value;
  return `${value.slice(0, visible)}…${value.slice(-visible)}`;
}

export function formatLamports(lamports: number, fractionDigits = 4): string {
  const whole = lamports / LAMPORTS_PER_COOK;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(whole);
}

export function formatTokenAmount(amount: string, decimals: number): string {
  if (!/^\d+$/.test(amount)) return amount;
  if (decimals <= 0) return amount;

  const padded = amount.padStart(decimals + 1, "0");
  const whole = padded.slice(0, -decimals);
  const fraction = padded.slice(-decimals).replace(/0+$/, "");
  const numeric = fraction.length > 0 ? `${whole}.${fraction}` : whole;
  const parsed = Number(numeric);

  if (!Number.isFinite(parsed)) return numeric;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: Math.min(decimals, 6),
  }).format(parsed);
}

export function formatSlot(slot: number): string {
  return new Intl.NumberFormat("en-US").format(slot);
}

export function formatRelativeTime(unixSeconds: number | null | undefined): string {
  if (!unixSeconds) return "unknown time";
  const deltaMs = Date.now() - unixSeconds * 1000;
  const deltaSeconds = Math.round(deltaMs / 1000);

  if (Math.abs(deltaSeconds) < 45) return "just now";
  const minutes = Math.round(deltaSeconds / 60);
  if (Math.abs(minutes) < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 48) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.length > 0) return error;
  return fallback;
}
