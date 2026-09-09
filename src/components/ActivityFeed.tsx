import type { ConfirmedSignatureInfo } from "@solana/web3.js";
import { cookiescanTxUrl } from "../config";
import { formatRelativeTime, shortenAddress } from "../lib/format";
import { StatusBlock } from "./StatusBlock";

type ActivityFeedProps = {
  connected: boolean;
  loading: boolean;
  error: string | null;
  signatures: ConfirmedSignatureInfo[];
  onRetry: () => void;
};

export function ActivityFeed({
  connected,
  loading,
  error,
  signatures,
  onRetry,
}: ActivityFeedProps) {
  if (!connected) {
    return (
      <StatusBlock
        kind="empty"
        title="No wallet feed yet"
        detail="Connect Nightly to load recent signatures for the active Cookie Chain address."
      />
    );
  }

  if (loading && signatures.length === 0) {
    return (
      <StatusBlock
        kind="loading"
        title="Fetching recent signatures"
        detail="Cookie RPC getSignaturesForAddress is in flight."
      />
    );
  }

  if (error && signatures.length === 0) {
    return (
      <StatusBlock
        kind="error"
        title="Activity feed failed"
        detail={error}
        action={{ label: "Retry activity", onClick: onRetry }}
      />
    );
  }

  if (signatures.length === 0) {
    return (
      <StatusBlock
        kind="empty"
        title="No signatures on Cookie Chain"
        detail="This wallet has no recent confirmed activity on the community RPC."
      />
    );
  }

  return (
    <ol className="activity-list">
      {signatures.map((item) => (
        <li key={item.signature} className={item.err ? "tx-failed" : "tx-ok"}>
          <a href={cookiescanTxUrl(item.signature)} target="_blank" rel="noreferrer">
            {shortenAddress(item.signature, 6)}
          </a>
          <span>{item.err ? "failed" : "confirmed"}</span>
          <time>{formatRelativeTime(item.blockTime)}</time>
          <em>slot {item.slot.toLocaleString()}</em>
        </li>
      ))}
    </ol>
  );
}
