# Bugs

Known issues, RPC quirks, and wallet notes for Cookie Pulse.

## Open

| Date | Surface | Severity | Status | Notes |
| --- | --- | --- | --- | --- |
| 2026-09-09 | WSS | Medium | Open | Cookie docs list WebSocket `https://wss.cookiescan.io`. TLS for that host does not match `wss.cookiescan.io` (cert presented as another hostname). Cookie Pulse therefore polls HTTP RPC for slot and does not set `wsEndpoint` unless `VITE_COOKIE_WSS_URL` is provided. |
| 2026-09-09 | Nightly | Low | Open | Cloud / CI browsers do not have Nightly installed. The console shows Install Nightly and still reads slot. Connected-wallet UI needs the extension. |
| 2026-09-09 | Pages | Low | Open | Live URL stays dark until Esad sets **Settings → Pages → Source → GitHub Actions**. No secrets. See `docs/PAGES.md`. |

## Template

| Date | Surface | Severity | Status | Notes |
| --- | --- | --- | --- | --- |
| | | | | |

## How to file

1. Reproduce on Cookie RPC `https://rpc.cookiescan.io`.
2. Record whether Nightly was connected.
3. Capture the toast or status copy, plus the Cookiescan address or signature if relevant.
4. Do not paste private keys or seed phrases.
