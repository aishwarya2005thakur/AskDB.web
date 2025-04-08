
import { Database, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LevelHeaderProps {
  title: string;
  description: string;
  completedCount: number;
  dbDiagram: string;
}

const LevelHeader = ({ title, description, completedCount, dbDiagram }: LevelHeaderProps) => {
  return (
    <Card className="overflow-hidden border-t-4 border-pdf-primary">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5 text-pdf-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Progress:</h3>
          <div className="flex items-center gap-3">
            <Progress value={(completedCount / 5) * 100} className="h-2" />
            <span className="text-sm font-medium">{completedCount} of 5 completed</span>
          </div>
        </div>
        
        <div className="relative border rounded-md p-4 mb-4 bg-white">
          <div className="text-sm font-medium mb-2">Database Diagram:</div>
          <div className="overflow-auto">
            <img 
              src={dbDiagram} 
              alt="Database Diagram" 
              className="max-w-full h-auto mx-auto"
            />
          </div>
          <div className="absolute top-2 right-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              title="Show column details"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelHeader;
