import type { TokenHolding } from "../lib/rpc";
import { cookiescanAddressUrl } from "../config";
import { formatLamports, formatTokenAmount, shortenAddress } from "../lib/format";
import { StatusBlock } from "./StatusBlock";

type BalancesProps = {
  connected: boolean;
  loading: boolean;
  error: string | null;
  lamports: number | null;
  tokens: TokenHolding[];
  onRetry: () => void;
};

export function Balances({
  connected,
  loading,
  error,
  lamports,
  tokens,
  onRetry,
}: BalancesProps) {
  if (!connected) {
    return (
      <StatusBlock
        kind="empty"
        title="Connect Nightly to read balances"
        detail="The console stays on Cookie RPC either way. Wallet data appears after Nightly approves the session."
      />
    );
  }

  if (loading && lamports === null) {
    return (
      <StatusBlock
        kind="loading"
        title="Reading COOK and SPL accounts"
        detail="Asking Cookie RPC for native balance and parsed token accounts."
      />
    );
  }

  if (error && lamports === null) {
    return (
      <StatusBlock
        kind="error"
        title="Balances unavailable"
        detail={error}
        action={{ label: "Retry balances", onClick: onRetry }}
      />
    );
  }

  return (
    <div className="stack">
      <div className="metric">
        <span className="kicker">Native COOK</span>
        <strong>{lamports === null ? "—" : `${formatLamports(lamports)} COOK`}</strong>
        <span className="muted">
          {lamports === null ? "waiting" : `${lamports.toLocaleString()} lamports`}
        </span>
      </div>

      {tokens.length === 0 ? (
        <StatusBlock
          kind="empty"
          title="No SPL balances"
          detail="No non-zero SPL Token or Token-2022 accounts were returned for this wallet."
        />
      ) : (
        <ul className="token-list">
          {tokens.map((token) => (
            <li key={`${token.program}-${token.mint}`}>
              <a href={cookiescanAddressUrl(token.mint)} target="_blank" rel="noreferrer">
                {shortenAddress(token.mint, 5)}
              </a>
              <span>{formatTokenAmount(token.amount, token.decimals)}</span>
              <em>{token.program}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
