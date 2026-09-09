type StatusKind = "loading" | "empty" | "error" | "idle";

type StatusBlockProps = {
  kind: StatusKind;
  title: string;
  detail?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function StatusBlock({ kind, title, detail, action }: StatusBlockProps) {
  return (
    <div className={`status status-${kind}`} role={kind === "error" ? "alert" : "status"}>
      <span className="status-kicker">{kind}</span>
      <strong>{title}</strong>
      {detail ? <p>{detail}</p> : null}
      {action ? (
        <button type="button" className="ghost-button" onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
