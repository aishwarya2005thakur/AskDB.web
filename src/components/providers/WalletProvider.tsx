import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';
import { ReactNode } from 'react';

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET, // Using testnet for development
      }}
      onError={(error) => {
        console.log("Wallet adapter error:", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};