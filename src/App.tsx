import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useRef } from "react";
import { ActivityFeed } from "./components/ActivityFeed";
import { Balances } from "./components/Balances";
import { Heartbeat } from "./components/Heartbeat";
import { NightlyConnect } from "./components/NightlyConnect";
import { PulseStub } from "./components/PulseStub";
import { StatusBlock } from "./components/StatusBlock";
import { ToastStack } from "./components/ToastStack";
import {
  BRIDGE_URL,
  COOKIE_BUILDERS_URL,
  COOKIE_DOCS_URL,
  COOKIE_RPC_URL,
  DOCUMENTED_WSS_URL,
  COOKIESCAN_API_URL,
  COOKIESCAN_URL,
  LISTING_URL,
  NIGHTLY_INSTALL_URL,
  cookiescanAddressUrl,
} from "./config";
import { useSlot } from "./hooks/useSlot";
import { useToasts } from "./hooks/useToasts";
import { useWalletActivity } from "./hooks/useWalletActivity";
import { formatSlot } from "./lib/format";

export default function App() {
  const { connected, publicKey } = useWallet();
  const { slot, error: slotError, updatedAt, history, loading: slotLoading } = useSlot();
  const activity = useWalletActivity(publicKey);
  const { toasts, push, dismiss } = useToasts();
  const lastError = useRef<string | null>(null);
  const lastActivityError = useRef<string | null>(null);

  useEffect(() => {
    if (slotError && lastError.current !== slotError) {
      lastError.current = slotError;
      push({
        tone: "error",
        title: "Slot feed interrupted",
        detail: slotError,
      });
    }
    if (!slotError) lastError.current = null;
  }, [push, slotError]);

  useEffect(() => {
    if (activity.error && lastActivityError.current !== activity.error) {
      lastActivityError.current = activity.error;
      push({
        tone: "error",
        title: "Wallet read incomplete",
        detail: activity.error,
      });
    }
    if (!activity.error) lastActivityError.current = null;
  }, [activity.error, push]);

  const notify = useCallback(
    (input: { tone: "info" | "ok" | "warn" | "error"; title: string; detail?: string }) => {
      push(input);
    },
    [push],
  );

  return (
    <div className="shell">
      <header className="masthead">
        <div>
          <p className="brand-kicker">Cookie Chain · activity console</p>
          <h1>Cookie Pulse</h1>
        </div>
        <NightlyConnect onStatus={notify} />
      </header>

      <section className="slot-band" aria-live="polite">
        <div className="slot-copy">
          <span className="kicker">Live slot</span>
          {slotLoading && slot === null ? (
            <strong className="slot-value">syncing</strong>
          ) : slotError && slot === null ? (
            <strong className="slot-value slot-error">offline</strong>
          ) : (
            <strong className="slot-value">{slot === null ? "—" : formatSlot(slot)}</strong>
          )}
          <span className="muted">
            {updatedAt
              ? `updated ${Math.max(0, Math.round((Date.now() - updatedAt) / 1000))}s ago`
              : "waiting for Cookie RPC"}
          </span>
        </div>
        <Heartbeat history={history} />
        <p className="rpc-line">
          RPC <code>{COOKIE_RPC_URL}</code>
          <span className="wss-note">docs WSS {DOCUMENTED_WSS_URL} (optional)</span>
        </p>
      </section>

      {slotError && slot === null ? (
        <StatusBlock
          kind="error"
          title="Cookie RPC is not returning a slot"
          detail={`${slotError} The rest of the console can still wait for Nightly, but chain reads need ${COOKIE_RPC_URL}.`}
        />
      ) : null}

      <main className="console">
        <section className="panel">
          <header className="panel-head">
            <span className="kicker">Wallet</span>
            <h2>Address and balances</h2>
            {connected && publicKey ? (
              <button type="button" className="ghost-button" onClick={() => void activity.refresh()}>
                Refresh
              </button>
            ) : null}
          </header>
          {connected && publicKey ? (
            <p className="address-line">
              <a
                href={cookiescanAddressUrl(publicKey.toBase58())}
                target="_blank"
                rel="noreferrer"
                className="full-address"
              >
                {publicKey.toBase58()}
              </a>
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  void navigator.clipboard.writeText(publicKey.toBase58()).then(
                    () => push({ tone: "ok", title: "Address copied" }),
                    () =>
                      push({
                        tone: "error",
                        title: "Copy failed",
                        detail: "Select the address and copy it manually.",
                      }),
                  );
                }}
              >
                Copy
              </button>
            </p>
          ) : null}
          <Balances
            connected={connected}
            loading={activity.loading}
            error={activity.error}
            lamports={activity.lamports}
            tokens={activity.tokens}
            onRetry={() => void activity.refresh()}
          />
        </section>

        <section className="panel">
          <header className="panel-head">
            <span className="kicker">Activity</span>
            <h2>Recent signatures</h2>
          </header>
          <ActivityFeed
            connected={connected}
            loading={activity.loading}
            error={activity.error}
            signatures={activity.signatures}
            onRetry={() => void activity.refresh()}
          />
        </section>

        <PulseStub
          connected={connected}
          onNotify={(detail) => push({ tone: "warn", title: "Pulse is not armed", detail })}
        />
      </main>

      <footer className="footnotes">
        <a href={NIGHTLY_INSTALL_URL} target="_blank" rel="noreferrer">
          Install Nightly
        </a>
        <a href={BRIDGE_URL} target="_blank" rel="noreferrer">
          Bridge COOK
        </a>
        <a href={COOKIESCAN_URL} target="_blank" rel="noreferrer">
          Cookiescan
        </a>
        <a href={COOKIESCAN_API_URL} target="_blank" rel="noreferrer">
          DAS API
        </a>
        <a href={COOKIE_DOCS_URL} target="_blank" rel="noreferrer">
          Developer guide
        </a>
        <a href={COOKIE_BUILDERS_URL} target="_blank" rel="noreferrer">
          For builders
        </a>
        <a href={LISTING_URL} target="_blank" rel="noreferrer">
          Superteam listing
        </a>
      </footer>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
