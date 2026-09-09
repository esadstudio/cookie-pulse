import type { WalletError } from "@solana/wallet-adapter-base";
import { NightlyWalletAdapter } from "@solana/wallet-adapter-nightly";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { COOKIE_RPC_URL, COOKIE_WSS_URL } from "../config";

type WalletProvidersProps = {
  children: ReactNode;
};

export function WalletProviders({ children }: WalletProvidersProps) {
  const wallets = useMemo(() => [new NightlyWalletAdapter()], []);
  const onError = useCallback((error: WalletError) => {
    console.warn("Nightly adapter:", error.message);
  }, []);

  return (
    <ConnectionProvider
      endpoint={COOKIE_RPC_URL}
      config={{
        commitment: "confirmed",
        ...(COOKIE_WSS_URL ? { wsEndpoint: COOKIE_WSS_URL } : {}),
      }}
    >
      <WalletProvider
        wallets={wallets}
        autoConnect
        localStorageKey="cookie-pulse-nightly"
        onError={onError}
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
