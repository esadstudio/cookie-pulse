/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COOKIE_RPC_URL?: string;
  readonly VITE_COOKIE_WSS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
