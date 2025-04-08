
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface OutputData {
  headers: string[];
  rows: (string | number)[][];
}

interface OutputComparisonProps {
  userOutput: OutputData;
  expectedOutput: OutputData;
}

const OutputComparison = ({ userOutput, expectedOutput }: OutputComparisonProps) => {
  const [differences, setDifferences] = useState<Record<string, Record<string, boolean>>>({});
  const [missingRows, setMissingRows] = useState<number[]>([]);
  const [extraRows, setExtraRows] = useState<number[]>([]);

  // Find differences between user output and expected output
  useEffect(() => {
    const diffs: Record<string, Record<string, boolean>> = {};
    const missing: number[] = [];
    const extra: number[] = [];

    // Initialize empty difference tracking object
    expectedOutput.rows.forEach((_, rowIdx) => {
      diffs[rowIdx] = {};
    });

    // Check for missing or different rows
    expectedOutput.rows.forEach((expectedRow, expectedRowIdx) => {
      const matchFound = userOutput.rows.some((userRow, userRowIdx) => {
        // Check if rows match exactly
        const exactMatch = expectedRow.every((cell, cellIdx) => 
          String(cell) === String(userRow[cellIdx])
        );
        
        if (exactMatch) return true;
        
        // Track differences for partial matches
        let partialMatch = false;
        expectedRow.forEach((cell, cellIdx) => {
          if (userRowIdx < userOutput.rows.length && cellIdx < userRow.length) {
            if (String(cell) !== String(userRow[cellIdx])) {
              if (!diffs[expectedRowIdx]) diffs[expectedRowIdx] = {};
              diffs[expectedRowIdx][cellIdx] = true;
              partialMatch = true;
            }
          }
        });
        
        return false; // We're just collecting differences, not stopping the loop
      });
      
      if (!matchFound) {
        missing.push(expectedRowIdx);
      }
    });

    // Check for extra rows in user output
    userOutput.rows.forEach((userRow, userRowIdx) => {
      const matchFound = expectedOutput.rows.some(expectedRow => {
        return expectedRow.every((cell, cellIdx) => 
          String(cell) === String(userRow[cellIdx])
        );
      });
      
      if (!matchFound) {
        extra.push(userRowIdx);
      }
    });

    setDifferences(diffs);
    setMissingRows(missing);
    setExtraRows(extra);
  }, [userOutput, expectedOutput]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 p-3 rounded-md">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <p className="text-sm font-medium text-amber-800">
          Your output doesn't match the expected result
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Output */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Your Output:</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {userOutput.headers.map((header, idx) => (
                    <TableHead key={idx}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {userOutput.rows.map((row, rowIdx) => (
                  <TableRow 
                    key={rowIdx} 
                    className={cn(
                      extraRows.includes(rowIdx) ? "bg-red-50" : ""
                    )}
                  >
                    {row.map((cell, cellIdx) => (
                      <TableCell 
                        key={cellIdx}
                        className={cn(
                          // Highlight cells that don't match expected output
                          Object.keys(differences).some(expectedRowIdx => {
                            const expectedRow = expectedOutput.rows[parseInt(expectedRowIdx)];
                            if (!expectedRow) return false;
                            const sameValues = row.every((val, idx) => 
                              String(val) === String(expectedRow[idx])
                            );
                            return !sameValues && differences[parseInt(expectedRowIdx)][cellIdx];
                          }) 
                            ? "text-red-600 font-medium bg-red-50"
                            : "",
                          extraRows.includes(rowIdx) ? "text-red-600 font-medium" : ""
                        )}
                      >
                        {String(cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {extraRows.length > 0 && (
              <div className="text-xs text-red-600 p-2 border-t">
                {extraRows.length} row(s) should not be in the result
              </div>
            )}
          </div>
        </div>

        {/* Expected Output */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Expected Output:</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {expectedOutput.headers.map((header, idx) => (
                    <TableHead key={idx}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {expectedOutput.rows.map((row, rowIdx) => (
                  <TableRow 
                    key={rowIdx}
                    className={cn(
                      missingRows.includes(rowIdx) ? "bg-green-50" : ""
                    )}
                  >
                    {row.map((cell, cellIdx) => (
                      <TableCell 
                        key={cellIdx}
                        className={cn(
                          differences[rowIdx]?.[cellIdx] 
                            ? "text-green-600 font-medium bg-green-50" 
                            : "",
                          missingRows.includes(rowIdx) ? "text-green-600 font-medium" : ""  
                        )}
                      >
                        {String(cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {missingRows.length > 0 && (
              <div className="text-xs text-green-600 p-2 border-t">
                {missingRows.length} row(s) missing from your result
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-sm space-y-1 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-100 border border-red-600"></div>
          <span className="text-gray-700">Differences in your output</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-100 border border-green-600"></div>
          <span className="text-gray-700">What the correct output should be</span>
        </div>
      </div>
    </div>
  );
};

export default OutputComparison;
