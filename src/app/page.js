"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const wallet = useWallet();

  return (
    <div>
      <WalletMultiButtonDynamic>
        {wallet.publicKey
          ? `${wallet.publicKey.toBase58().substring(0, 7)}...`
          : "Connect Wallet"}
      </WalletMultiButtonDynamic>
    </div>
  );
}
