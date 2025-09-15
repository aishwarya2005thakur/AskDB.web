import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface CoinContextType {
  coins: number;
  addCoins: (amount: number, difficulty: string) => void;
  redeemCoins: () => void;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const useCoins = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinProvider');
  }
  return context;
};

interface CoinProviderProps {
  children: ReactNode;
}

export const CoinProvider = ({ children }: CoinProviderProps) => {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('sqlPracticeCoins');
    return saved ? parseInt(saved, 10) : 0;
  });

  const addCoins = (amount: number, difficulty: string) => {
    const newTotal = coins + amount;
    setCoins(newTotal);
    localStorage.setItem('sqlPracticeCoins', newTotal.toString());
    
    // Show reward toast
    toast.success(`+${amount} 🪙 added!`, {
      description: `Solved ${difficulty} question`,
      duration: 3000,
      position: 'bottom-right',
    });
  };

  const redeemCoins = () => {
    toast.info('Redeem feature coming soon! 💰', {
      description: 'Stay tuned for exciting rewards',
      duration: 2000,
    });
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins, redeemCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export const getCoinReward = (difficulty: string): number => {
  switch (difficulty) {
    case 'easy': return 5;
    case 'medium': return 10;
    case 'hard': return 15;
    default: return 5;
  }
};