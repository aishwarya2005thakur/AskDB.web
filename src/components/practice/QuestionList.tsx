
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import QuestionItem from "./QuestionItem";
import { Question, ValidationResult } from "@/types/practiceSQL";

interface QuestionListProps {
  levelId: string;
  questions: Question[];
  loadingStates: Record<string, boolean>;
  openHints: Record<string, boolean>;
  validationResults: Record<string, ValidationResult>;
  onQueryChange: (levelId: string, questionId: string, value: string) => void;
  onToggleHint: (questionId: string) => void;
  onSubmit: (levelId: string, questionId: string) => void;
}

const QuestionList = ({
  levelId,
  questions,
  loadingStates,
  openHints,
  validationResults,
  onQueryChange,
  onToggleHint,
  onSubmit
}: QuestionListProps) => {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <Collapsible 
          key={question.id}
          className={cn(
            "border rounded-lg overflow-hidden transition-all",
            question.completed ? "border-green-400 bg-green-50" : "border-slate-200"
          )}
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                  question.completed 
                    ? "bg-green-100 text-green-700" 
                    : "bg-slate-100 text-slate-700"
                )}>
                  {index + 1}
                </div>
                <div className="font-medium text-left">
                  {question.title}
                  {question.completed && (
                    <span className="ml-2 text-green-600 text-sm">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="pointer-events-none">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <QuestionItem
              index={index}
              question={question}
              levelId={levelId}
              loadingState={loadingStates[question.id] || false}
              openHint={openHints[question.id] || false}
              validationResult={validationResults[question.id]}
              onQueryChange={(value) => onQueryChange(levelId, question.id, value)}
              onToggleHint={() => onToggleHint(question.id)}
              onSubmit={() => onSubmit(levelId, question.id)}
            />
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default QuestionList;
