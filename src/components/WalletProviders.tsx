import { NightlyWalletAdapter } from "@solana/wallet-adapter-nightly";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { COOKIE_RPC_URL, COOKIE_WSS_URL } from "../config";

type WalletProvidersProps = {
  children: ReactNode;
};

export function WalletProviders({ children }: WalletProvidersProps) {
  const wallets = useMemo(() => [new NightlyWalletAdapter()], []);

  return (
    <ConnectionProvider
      endpoint={COOKIE_RPC_URL}
      config={{
        commitment: "confirmed",
        wsEndpoint: COOKIE_WSS_URL,
      }}
    >
      <WalletProvider
        wallets={wallets}
        autoConnect
        localStorageKey="cookie-pulse-nightly"
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
