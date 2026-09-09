type PulseStubProps = {
  connected: boolean;
  onNotify: (detail: string) => void;
};

export function PulseStub({ connected, onNotify }: PulseStubProps) {
  return (
    <section className="panel pulse-stub">
      <header className="panel-head">
        <span className="kicker">Write path</span>
        <h2>Pulse</h2>
      </header>
      <p>
        Phase 1 is read-first. This control does not request a signature and does not spend
        COOK. A later memo ping would need dust COOK for fees — that path stays off until a
        human funds a wallet on purpose.
      </p>
      <p className="todo">
        TODO: arm Pulse only after a fee-safe existing program or memo path is confirmed and
        dust is available. Do not invent Cookie program IDs. Do not send from this stub.
      </p>
      <button
        type="button"
        className="ghost-button"
        onClick={() =>
          onNotify(
            connected
              ? "Pulse is stubbed. No transaction was built or signed."
              : "Connect Nightly first. Pulse still will not sign until the write path is armed.",
          )
        }
      >
        Pulse (not armed)
      </button>
    </section>
  );
}
