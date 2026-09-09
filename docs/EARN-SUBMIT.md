# Superteam Earn paste pack

Paste-ready fields for [Create an App on Cookie Chain](https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/).

**READY** sections may be pasted as-is. **GATED** sections stay in this file until Esad says yes. Do not post to X. Do not share in Cookie Telegram. Do not arm Pulse. Do not spend COOK. Mermail stays untouched.

Listing type: bounty, human submit in the Earn UI (`agentAccess` is human-only).
Listing deadline (sponsor): 2026-09-22.

---

## READY TO PASTE

Copy the value under each heading into the matching Earn field. Do not include the heading text unless the form asks for a label.

### GitHub repository

Earn eligibility question (required link): `GitHub repository`

```
https://github.com/esadstudio/cookie-pulse
```

### Live application URL

Earn eligibility question (required link): `Live application URL`

PRIMARY (paste this):

```
https://cookie-pulse-nine.vercel.app
```

Public. Name-neutral hostname on the existing Vercel project. Vercel Authentication is off. No login wall.

Legacy Vercel hostname (same project, internal backup only). Do **not** paste this into Earn and do not headline it for Telegram:

```
https://cookie-pulse-esad-studio.vercel.app
```

Do **not** paste the Pages URL into the Earn live-application field. Pages is a free backup only:

```
https://esadstudio.github.io/cookie-pulse/
```

If the form also has a generic "Link" field, use the same PRIMARY Vercel URL.

### Relevant addresses

Earn eligibility question (required text): `Relevant program, contract, token, or application addresses (if applicable)`

```
N/A / none. Cookie Pulse does not deploy a custom program. Phase 1 is a read-path MVP on the Cookie community RPC. There is no application-owned program, contract, or token address to list. A Nightly public key is local to the judge's browser session and is not an app address.
```

### Short project description

Judge-facing. Factual. Use this in Earn "other info" / description if the form has a free-text box.

```
Cookie Pulse is a read-first Cookie Chain activity console built with Vite, React, and TypeScript. It points the official Solana client SDK at the Cookie community RPC (https://rpc.cookiescan.io) and requires Nightly as the wallet path.

The console shows the live Cookie slot with no wallet connected. After Nightly approves a session, it shows the full base58 address, native COOK, non-zero SPL Token and Token-2022 balances, and recent signatures with Cookiescan links. Slot, balances, and activity each have loading, empty, and error states. Status toasts report wallet and RPC events.

Phase 1 is the read path only. Pulse is on screen but not armed. The app does not build, sign, or send a transaction. No custom program. No private key in the app. No COOK spend.

Primary live URL: https://cookie-pulse-nine.vercel.app
Backup (GitHub Pages, already live): https://esadstudio.github.io/cookie-pulse/
Repo: https://github.com/esadstudio/cookie-pulse
```

### Demo steps for judges (no wallet spend)

Paste under other info after the short description, or keep for Esad's walkthrough.

```
1. Open https://cookie-pulse-nine.vercel.app (no login, no wallet required).
2. Confirm the live Cookie slot updates from https://rpc.cookiescan.io.
3. If Nightly is missing, use Install Nightly. The slot feed still runs.
4. Optional, still $0: click Connect Nightly and approve the session. Connecting only shares the public key. The app does not request a fee-paying signature.
5. After connect: full address (Cookiescan link + copy), native COOK, SPL / Token-2022 holdings, recent signatures with Cookiescan tx links.
6. Use Refresh if you want a second read. Try Pulse (not armed). Expect a toast. No transaction is built or signed.
7. Footer Bridge COOK is an outbound link to https://bridge.cookiescan.io. The app never starts a transfer.
8. If Vercel is down, use the Pages backup: https://esadstudio.github.io/cookie-pulse/
```

---

## GATED. DO NOT PASTE UNTIL ESAD YES

The listing also asks for an X thread and a Cookie Telegram share. A later Pulse write would need dust COOK for fees. Those gates are closed. Leave the Earn tweet / social fields blank unless Esad opens a gate and fills a stub below.

Do not invent URLs. Do not post. Do not spend.

### Dust Pulse tx proof

**DO NOT PASTE UNTIL ESAD YES**

Listing required features include transaction execution. Phase 1 does not send a tx. Pulse stays stubbed.

When Esad opens the Pulse gate, paste a Cookiescan transaction URL for a dust fee-safe memo or existing-program ping. Until then, keep this field empty on Earn.

```
[GATED STUB. Leave Earn blank.]
Cookiescan tx: REPLACE_WITH_COOKIE_SCAN_TX_URL
Signature: REPLACE_WITH_SIGNATURE
Note: dust COOK for fees only, after Pulse is armed on purpose. No custom program ID.
```

### X thread URL

**DO NOT PASTE UNTIL ESAD YES**

Listing demo requirement: an X thread that explains the app, shows how to use it, and points to the Cookie Chain bridge where relevant.

Draft copy lives in `docs/DEMO-THREAD-DRAFT.md` (also GATED, do not post). When Esad publishes the thread, paste the public URL here and into Earn's tweet field.

```
[GATED STUB. Leave Earn tweet/X field blank.]
X thread URL: REPLACE_WITH_X_THREAD_URL
```

### Cookie Telegram share

**DO NOT PASTE UNTIL ESAD YES**

Listing final step: share the X thread in the Cookie Chain Telegram community (`https://t.me/TheCookieNetChain`). Do not post until Esad says yes.

```
[GATED STUB. Do not share. Leave Earn blank.]
Telegram share proof: REPLACE_WITH_TELEGRAM_MESSAGE_LINK_OR_SCREENSHOT_NOTE
Community: https://t.me/TheCookieNetChain
```
