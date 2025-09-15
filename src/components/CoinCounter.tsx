import { Button } from '@/components/ui/button';
import { useCoins } from '@/hooks/useCoins';
import { Coins } from 'lucide-react';

const CoinCounter = () => {
  const { coins, redeemCoins } = useCoins();

  return (
    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Coins className="h-4 w-4 text-amber-500" />
        <span className="text-foreground">Total Coins: {coins}</span>
        <span className="text-lg">🪙</span>
      </div>
      
      <Button 
        onClick={redeemCoins}
        size="sm"
        variant="destructive"
        className="text-xs px-3 py-1 h-auto rounded-full hover:scale-105 transition-transform"
      >
        Redeem Cash
      </Button>
    </div>
  );
};

export default CoinCounter;