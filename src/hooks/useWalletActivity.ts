import { useConnection } from "@solana/wallet-adapter-react";
import type { ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "../lib/format";
import {
  readNativeBalance,
  readRecentSignatures,
  readTokenHoldings,
  type TokenHolding,
} from "../lib/rpc";

export function useWalletActivity(owner: PublicKey | null) {
  const { connection } = useConnection();
  const [lamports, setLamports] = useState<number | null>(null);
  const [tokens, setTokens] = useState<TokenHolding[]>([]);
  const [signatures, setSignatures] = useState<ConfirmedSignatureInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!owner) {
      setLamports(null);
      setTokens([]);
      setSignatures([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [nextLamports, nextTokens, nextSignatures] = await Promise.all([
        readNativeBalance(connection, owner),
        readTokenHoldings(connection, owner),
        readRecentSignatures(connection, owner),
      ]);
      setLamports(nextLamports);
      setTokens(nextTokens);
      setSignatures(nextSignatures);
      setError(null);
    } catch (error) {
      setError(errorMessage(error, "Could not read wallet activity from Cookie RPC"));
    } finally {
      setLoading(false);
    }
  }, [connection, owner]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { lamports, tokens, signatures, loading, error, refresh };
}
