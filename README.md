# Cookie Pulse

A read-first [Cookie Chain](https://docs.cookiechain.wtf/) activity console for the [Superteam Earn Cookie Chain cApp bounty](https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/).

Cookie Pulse is a Vite + React + TypeScript web app. It points the official Solana client SDK at the Cookie community RPC, requires [Nightly](https://nightly.app/download) via `@solana/wallet-adapter-nightly`, and shows live slot, native COOK, SPL / Token-2022 balances, and recent signatures.

Phase 1 is the **read path**. The console does not deploy a custom program, does not ask for a private key, and does not spend COOK. On-chain transactions are gated. Pulse stays stubbed until Esad opens that gate.

Paste-ready Superteam Earn fields: [docs/EARN-SUBMIT.md](docs/EARN-SUBMIT.md).

## Live URL (PRIMARY for Earn judges)

https://cookie-pulse-nine.vercel.app

Public Vercel deploy on the existing project. Name-neutral hostname. Vercel Authentication is off. Judges can open the console without a login wall and without spending COOK.

### Secondary (legacy Vercel hostname, internal only)

https://cookie-pulse-esad-studio.vercel.app

Same Vercel project. Internal backup only. Do not headline this hostname for Earn or Telegram.

### Backup (GitHub Pages, already live)

https://esadstudio.github.io/cookie-pulse/

Free Pages backup. Same app. Not the Earn headline URL. Ops notes: [docs/PAGES.md](docs/PAGES.md).

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

This branch is meant to be judged without spending COOK.

| Need | Where |
| --- | --- |
| Live URL (PRIMARY) | https://cookie-pulse-nine.vercel.app (public, Vercel Auth off) |
| Legacy Vercel hostname | https://cookie-pulse-esad-studio.vercel.app (same project, internal backup only) |
| Backup URL | https://esadstudio.github.io/cookie-pulse/ (GitHub Pages, already live) |
| Nightly | https://nightly.app/download. Use **Connect Nightly** in the console. |
| Cookie RPC | `https://rpc.cookiescan.io` (`COOKIE_RPC_URL` / `VITE_COOKIE_RPC_URL`) |
| Bridge COOK | https://bridge.cookiescan.io. Link only. This app never starts a transfer. |
| Explorer | https://cookiescan.io |
| Pulse | Stub only. Arming a memo later needs dust COOK for fees. Not in this phase. |

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
  DEMO-THREAD-DRAFT.md   GATED X draft. Do not post.
  EARN-SUBMIT.md         paste-ready Superteam Earn fields
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
- Armed Pulse / any on-chain write (gated until Esad opens it)
- Memecoin launcher / ape UX
- Private keys in the browser app
