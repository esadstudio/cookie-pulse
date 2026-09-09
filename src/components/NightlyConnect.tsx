import { WalletReadyState } from "@solana/wallet-adapter-base";
import { NightlyWalletName } from "@solana/wallet-adapter-nightly";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { NIGHTLY_INSTALL_URL } from "../config";
import { errorMessage, shortenAddress } from "../lib/format";

type NightlyConnectProps = {
  onStatus: (input: {
    tone: "info" | "ok" | "warn" | "error";
    title: string;
    detail?: string;
  }) => void;
};

export function NightlyConnect({ onStatus }: NightlyConnectProps) {
  const { wallets, select, connect, disconnect, connected, connecting, publicKey, wallet } =
    useWallet();

  const nightly = useMemo(() => {
    const named = wallets.filter(
      (item) => item.adapter.name === NightlyWalletName || item.adapter.name === "Nightly",
    );
    return (
      named.find(
        (item) =>
          item.readyState === WalletReadyState.Installed ||
          item.readyState === WalletReadyState.Loadable,
      ) ??
      named[0] ??
      null
    );
  }, [wallets]);

  const readyState = nightly?.readyState ?? WalletReadyState.NotDetected;
  const installed =
    readyState === WalletReadyState.Installed ||
    readyState === WalletReadyState.Loadable;
  const pendingConnect = useRef(false);

  useEffect(() => {
    if (!pendingConnect.current) return;
    if (!wallet || wallet.adapter.name !== NightlyWalletName) return;
    if (connected || connecting) return;

    pendingConnect.current = false;
    void connect()
      .then(() => {
        onStatus({
          tone: "ok",
          title: "Nightly connected",
          detail: "Reading Cookie Chain balances and recent signatures.",
        });
      })
      .catch((error: unknown) => {
        onStatus({
          tone: "error",
          title: "Nightly did not connect",
          detail: errorMessage(error, "Approve the request in Nightly, or install the extension."),
        });
      });
  }, [connect, connected, connecting, onStatus, wallet]);

  const handleConnect = useCallback(() => {
    if (!nightly) {
      onStatus({
        tone: "error",
        title: "Nightly adapter missing",
        detail: "Reload the console and confirm @solana/wallet-adapter-nightly is installed.",
      });
      return;
    }

    pendingConnect.current = true;
    if (wallet?.adapter.name === nightly.adapter.name) {
      pendingConnect.current = false;
      void connect()
        .then(() => {
          onStatus({
            tone: "ok",
            title: "Nightly connected",
            detail: "Reading Cookie Chain balances and recent signatures.",
          });
        })
        .catch((error: unknown) => {
          onStatus({
            tone: "error",
            title: "Nightly did not connect",
            detail: errorMessage(error, "Approve the request in Nightly, or install the extension."),
          });
        });
      return;
    }
    select(nightly.adapter.name);
  }, [connect, nightly, onStatus, select, wallet]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      onStatus({ tone: "info", title: "Wallet disconnected" });
    } catch (error) {
      onStatus({
        tone: "error",
        title: "Disconnect failed",
        detail: errorMessage(error, "Nightly did not close the session."),
      });
    }
  }, [disconnect, onStatus]);

  if (connected && publicKey) {
    return (
      <div className="wallet-controls">
        <span className="wallet-chip" title={publicKey.toBase58()}>
          {wallet?.adapter.name ?? "Nightly"} · {shortenAddress(publicKey.toBase58())}
        </span>
        <button type="button" className="ghost-button" onClick={() => void handleDisconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  if (!installed) {
    return (
      <div className="wallet-controls">
        <a className="primary-button" href={NIGHTLY_INSTALL_URL} target="_blank" rel="noreferrer">
          Install Nightly
        </a>
      </div>
    );
  }

  return (
    <div className="wallet-controls">
      <button
        type="button"
        className="primary-button"
        onClick={() => void handleConnect()}
        disabled={connecting}
      >
        {connecting ? "Connecting…" : "Connect Nightly"}
      </button>
    </div>
  );
}
