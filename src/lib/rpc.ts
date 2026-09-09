import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  PublicKey,
  type ConfirmedSignatureInfo,
  type Connection,
} from "@solana/web3.js";

export type TokenHolding = {
  mint: string;
  amount: string;
  decimals: number;
  program: "spl-token" | "token-2022";
};

export async function readNativeBalance(
  connection: Connection,
  owner: PublicKey,
): Promise<number> {
  return connection.getBalance(owner, "confirmed");
}

export async function readTokenHoldings(
  connection: Connection,
  owner: PublicKey,
): Promise<TokenHolding[]> {
  const [legacy, token2022] = await Promise.all([
    connection.getParsedTokenAccountsByOwner(owner, {
      programId: TOKEN_PROGRAM_ID,
    }),
    connection.getParsedTokenAccountsByOwner(owner, {
      programId: TOKEN_2022_PROGRAM_ID,
    }),
  ]);

  const mapAccount = (
    account: (typeof legacy.value)[number],
    program: TokenHolding["program"],
  ): TokenHolding | null => {
    const info = account.account.data.parsed?.info;
    const tokenAmount = info?.tokenAmount;
    if (!info?.mint || !tokenAmount) return null;
    if (tokenAmount.amount === "0") return null;

    return {
      mint: String(info.mint),
      amount: String(tokenAmount.amount),
      decimals: Number(tokenAmount.decimals ?? 0),
      program,
    };
  };

  return [
    ...legacy.value
      .map((account) => mapAccount(account, "spl-token"))
      .filter((holding): holding is TokenHolding => holding !== null),
    ...token2022.value
      .map((account) => mapAccount(account, "token-2022"))
      .filter((holding): holding is TokenHolding => holding !== null),
  ];
}

export async function readRecentSignatures(
  connection: Connection,
  owner: PublicKey,
  limit = 12,
): Promise<ConfirmedSignatureInfo[]> {
  return connection.getSignaturesForAddress(owner, { limit });
}
