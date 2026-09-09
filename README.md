# Cookie Pulse

A read-first [Cookie Chain](https://docs.cookiechain.wtf/) activity console for the [Superteam Earn Cookie Chain cApp bounty](https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/).

Cookie Pulse is a Vite + React + TypeScript web app. It points the official Solana client SDK at the Cookie community RPC, requires [Nightly](https://nightly.app/download) via `@solana/wallet-adapter-nightly`, and shows live slot, native COOK, SPL / Token-2022 balances, and recent signatures. Phase 1 does not deploy a custom program, does not ask for a private key, and does not spend COOK.

## What judges should see

- App boots without a wallet and still shows the current Cookie Chain slot from RPC.
- Nightly connect is the only wallet path. If the extension is missing, the console links to the Nightly download page.
- After Nightly connects: full address, native COOK, non-zero SPL balances, and a recent signature feed with Cookiescan links.
- Loading, empty, and error states on slot, balances, and activity.
- Transaction / wallet status toasts.
- Pulse is visible but **not armed**. It is a labeled TODO for a later cheap memo or existing Cookie program call. It never builds or signs a transaction in this phase.

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

The app reads `VITE_COOKIE_RPC_URL` and `VITE_COOKIE_WSS_URL`. `.env.example` also documents `COOKIE_RPC_URL` so the endpoint name matches other Cookie tooling.

Slot is polled with `connection.getSlot("confirmed")`. Wallet reads use `getBalance`, `getParsedTokenAccountsByOwner` against the canonical SPL Token and Token-2022 program IDs, and `getSignaturesForAddress`. No invented Cookie program IDs.

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
  DEMO-THREAD-DRAFT.md
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
