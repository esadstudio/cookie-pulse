import { useConnection } from "@solana/wallet-adapter-react";
import type { ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const current = ++requestId.current;

    if (!owner) {
      setLamports(null);
      setTokens([]);
      setSignatures([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const [nativeResult, tokenResult, signatureResult] = await Promise.allSettled([
      readNativeBalance(connection, owner),
      readTokenHoldings(connection, owner),
      readRecentSignatures(connection, owner),
    ]);

    if (current !== requestId.current) return;

    const failures: string[] = [];

    if (nativeResult.status === "fulfilled") {
      setLamports(nativeResult.value);
    } else {
      setLamports(null);
      failures.push(errorMessage(nativeResult.reason, "Native COOK balance failed"));
    }

    if (tokenResult.status === "fulfilled") {
      setTokens(tokenResult.value);
    } else {
      setTokens([]);
      failures.push(errorMessage(tokenResult.reason, "SPL token accounts failed"));
    }

    if (signatureResult.status === "fulfilled") {
      setSignatures(signatureResult.value);
    } else {
      setSignatures([]);
      failures.push(errorMessage(signatureResult.reason, "Signature feed failed"));
    }

    setError(failures.length > 0 ? failures.join(" · ") : null);
    setLoading(false);
  }, [connection, owner]);

  useEffect(() => {
    void refresh();
    return () => {
      requestId.current += 1;
    };
  }, [refresh]);

  return { lamports, tokens, signatures, loading, error, refresh };
}
