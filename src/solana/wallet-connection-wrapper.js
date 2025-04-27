"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export const WalletConnectionWrapper = ({ children }) => {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <>
        <h1 className="">Wallet Not Connected</h1>
        <p className="">
          Please connect your wallet to continue using this application.
        </p>
        <div className="">
          <WalletMultiButton />
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default WalletConnectionWrapper;
