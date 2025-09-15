import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { ReactNode } from 'react';

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};