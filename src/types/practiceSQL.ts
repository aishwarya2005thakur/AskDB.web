
export interface OutputData {
  headers: string[];
  rows: (string | number)[][];
}

export interface Question {
  id: string;
  title: string;
  task: string;
  completed: boolean;
  userQuery: string;
  expectedOutput: OutputData;
}

export interface Level {
  id: string;
  title: string;
  dbDiagram: string;
  description: string;
  questions: Question[];
  completed: number;
  unlocked: boolean;
}

export interface ValidationResult {
  correct: boolean;
  userOutput?: OutputData;
  expectedOutput?: OutputData;
}
