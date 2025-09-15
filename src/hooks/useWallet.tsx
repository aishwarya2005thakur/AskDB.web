import { createContext, useContext, ReactNode } from 'react';
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';

interface WalletContextType {
  connected: boolean;
  account: any;
  connect: (walletName?: string) => Promise<void>;
  disconnect: () => void;
  walletAddress: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const { connected, account, connect: aptosConnect, disconnect } = useAptosWallet();

  const walletAddress = account?.address ? String(account.address) : null;

  const connect = async (walletName?: string) => {
    try {
      if (walletName) {
        await aptosConnect(walletName as any);
      } else {
        // Connect to any available wallet
        await aptosConnect('Petra' as any);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const value = {
    connected,
    account,
    connect,
    disconnect,
    walletAddress
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};