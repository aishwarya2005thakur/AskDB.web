import { createContext, useContext, ReactNode } from 'react';

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

// Temporary mock implementation until Aptos dependencies are resolved
export const WalletProvider = ({ children }: WalletProviderProps) => {
  const value = {
    connected: false,
    account: null,
    connect: async () => {
      console.log('Wallet connection temporarily disabled - dependency issues');
    },
    disconnect: async () => {
      console.log('Wallet disconnection temporarily disabled');
    },
    walletAddress: null
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};