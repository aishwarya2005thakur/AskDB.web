import { CheckCircle2 } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Level } from "@/types/practiceSQL";

interface LevelTabsProps {
  levels: Level[];
}

const LevelTabs = ({ levels }: LevelTabsProps) => {
  return (
    <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-6">
      {levels.map(level => (
        <TabsTrigger 
          key={level.id} 
          value={level.id}
          disabled={!level.unlocked}
          className={!level.unlocked ? "opacity-50 cursor-not-allowed" : ""}
        >
          {level.title}
          {level.completed === 5 && (
            <CheckCircle2 className="ml-1 h-4 w-4 text-green-600" />
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default LevelTabs;
