"use client";

import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import {
  AlphaWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo, useState, useEffect } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";

import "@solana/wallet-adapter-react-ui/styles.css";

const WalletModalProvider = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      ({ WalletModalProvider }) => WalletModalProvider
    ),
  { ssr: false }
);

const WalletConnectionWrapper = dynamic(
  () =>
    import("./wallet-connection-wrapper").then(
      (mod) => mod.WalletConnectionWrapper
    ),
  { ssr: false }
);

export const Wallet = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use testnet explicitly
  const endpoint =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl("testnet");

  const config = {
    commitment: "confirmed",
    wsEndpoint: endpoint.replace("https", "wss"),
    confirmTransactionInitialTimeout: 60000, // 60 seconds
  };

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new AlphaWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ConnectionProvider endpoint={endpoint} config={config}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <WalletConnectionWrapper>{children}</WalletConnectionWrapper>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
