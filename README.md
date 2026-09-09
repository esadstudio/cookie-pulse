# Cookie Pulse

A read-first [Cookie Chain](https://docs.cookiechain.wtf/) activity console for the [Superteam Earn Cookie Chain cApp bounty](https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/).

Cookie Pulse is a Vite + React + TypeScript web app. It points the official Solana client SDK at the Cookie community RPC, requires [Nightly](https://nightly.app/download) via `@solana/wallet-adapter-nightly`, and shows live slot, native COOK, SPL / Token-2022 balances, and recent signatures. Phase 1 does not deploy a custom program, does not ask for a private key, and does not spend COOK.

## What judges should see

- App boots without a wallet and still shows the current Cookie Chain slot from RPC.
- Nightly connect is the only wallet path. If the extension is missing, the console links to the Nightly download page.
- After Nightly connects: the full base58 address, native COOK, non-zero SPL balances, and a recent signature feed with Cookiescan links.
- Loading, empty, and error states on slot, balances, and activity.
- Transaction / wallet status toasts.
- Pulse is visible but **not armed**. A later memo ping would need dust COOK for fees. Phase 1 never builds or signs a transaction.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Production build:

```bash
npm install
npm run build
npm run preview
```

No secrets are required. Do not put a private key in `.env`.

## Earn-ready at $0

This branch is meant to be judged without spending COOK and without a paid host.

| Need | Where |
| --- | --- |
| Nightly | https://nightly.app/download — **Connect Nightly** in the console |
| Cookie RPC | `https://rpc.cookiescan.io` (`COOKIE_RPC_URL` / `VITE_COOKIE_RPC_URL`) |
| Bridge COOK | https://bridge.cookiescan.io — this app never starts a transfer |
| Explorer | https://cookiescan.io |
| Pulse | Stub only. Arming a memo later needs dust COOK for fees. Not in this phase. |
| Live URL | Free GitHub Pages after merge — see below |

## Live URL (GitHub Pages)

After `main` has this workflow and Pages is set to **GitHub Actions**:

https://esadstudio.github.io/cookie-pulse/

No secrets. No Vercel bill. Exact clicks: [docs/PAGES.md](docs/PAGES.md).

### Enable Pages (Esad — one-time)

1. Repo **Settings → Pages**
2. **Build and deployment → Source → GitHub Actions**
3. Do not choose “Deploy from a branch”
4. Merge this work to `main` (or **Actions → GitHub Pages → Run workflow**)
5. Open https://esadstudio.github.io/cookie-pulse/

If Deploy sits on the `github-pages` environment, approve it under **Settings → Environments**, or clear required reviewers. Still $0.

## RPC and explorer

Cookie Chain is SVM-compatible. The only required change from a normal Solana client is the endpoint.

| Role | URL |
| --- | --- |
| HTTP RPC | `https://rpc.cookiescan.io` |
| WebSocket | `https://wss.cookiescan.io` |
| Explorer | https://cookiescan.io |
| DAS API | https://api.cookiescan.io |
| Bridge | https://bridge.cookiescan.io |
| Docs | https://docs.cookiechain.wtf/developer-guide |
| Builders | https://docs.cookiechain.wtf/for-builders |

The app reads `VITE_COOKIE_RPC_URL`. `.env.example` also documents `COOKIE_RPC_URL` so the endpoint name matches other Cookie tooling.

Slot is polled over HTTP with `connection.getSlot("confirmed")`. Official docs list WebSocket `https://wss.cookiescan.io`, but that host currently presents a mismatched TLS certificate, so WebSocket is optional (`VITE_COOKIE_WSS_URL`) and off by default. See `docs/BUGS.md`.

Wallet reads use `getBalance`, `getParsedTokenAccountsByOwner` against the canonical SPL Token and Token-2022 program IDs, and `getSignaturesForAddress`. Those three calls are isolated so one failure cannot hide the others. No invented Cookie program IDs.

## Nightly

Cookie docs list Nightly as the supported wallet. Cookie Pulse registers `NightlyWalletAdapter` from [`@solana/wallet-adapter-nightly`](https://www.npmjs.com/package/@solana/wallet-adapter-nightly) and also accepts a Wallet Standard Nightly instance if the extension exposes one.

1. Install Nightly from https://nightly.app/download
2. Create or import a Solana-compatible account
3. Point Nightly at Cookie Chain using the community RPC `https://rpc.cookiescan.io` if you want the wallet UI itself to show Cookie balances
4. Open Cookie Pulse and use **Connect Nightly**

The console always reads chain state through its own Cookie RPC connection. Connecting Nightly only supplies the public key.

## Bridge COOK

Bridge COOK between Solana and Cookie Chain at https://bridge.cookiescan.io. Official docs also mention the Hyperlane / community multi-sig path. This app never initiates a bridge transfer.

## Listing

https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/

## Project layout

```
src/
  App.tsx
  config.ts
  components/     Nightly connect, balances, activity, Pulse stub, toasts
  hooks/          slot polling, wallet reads, toast store
  lib/            formatters and RPC helpers
docs/
  BUGS.md
  PAGES.md
  DEMO-THREAD-DRAFT.md
.github/workflows/pages.yml   free GitHub Pages build + deploy
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Vite server |
| `npm run build` | Typecheck and production bundle |
| `npm run preview` | Serve the production bundle |
| `npm test` | Formatter unit tests |

## Out of scope (Phase 1)

- Custom on-chain program deploy
- Spending COOK or requesting a fee-paying signature
- Memecoin launcher / ape UX
- Private keys in the browser app
