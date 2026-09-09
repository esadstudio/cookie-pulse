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
        Phase 1 is read-first. This control will later send a cheap memo or call an existing
        Cookie program. It does not request a signature and does not spend COOK.
      </p>
      <p className="todo">
        TODO: arm Pulse only after a fee-safe existing program or memo path is confirmed. Do
        not invent Cookie program IDs.
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
