export const DEFAULT_RPC_URL = "https://rpc.cookiescan.io";
export const DEFAULT_WSS_URL = "https://wss.cookiescan.io";

export const COOKIE_RPC_URL =
  import.meta.env.VITE_COOKIE_RPC_URL ?? DEFAULT_RPC_URL;
export const COOKIE_WSS_URL =
  import.meta.env.VITE_COOKIE_WSS_URL ?? DEFAULT_WSS_URL;

export const COOKIESCAN_URL = "https://cookiescan.io";
export const COOKIESCAN_API_URL = "https://api.cookiescan.io";
export const BRIDGE_URL = "https://bridge.cookiescan.io";
export const NIGHTLY_INSTALL_URL = "https://nightly.app/download";
export const COOKIE_DOCS_URL = "https://docs.cookiechain.wtf/developer-guide";
export const COOKIE_BUILDERS_URL = "https://docs.cookiechain.wtf/for-builders";
export const LISTING_URL =
  "https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/";

export function cookiescanAddressUrl(address: string): string {
  return `${COOKIESCAN_URL}/address/${address}`;
}

export function cookiescanTxUrl(signature: string): string {
  return `${COOKIESCAN_URL}/tx/${signature}`;
}
