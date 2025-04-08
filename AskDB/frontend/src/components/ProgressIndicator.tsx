
import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { ProgressStatus } from '@/services/pdfService';

interface ProgressIndicatorProps {
  status: ProgressStatus;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  status,
  className,
}) => {
  const getStatusColor = () => {
    switch (status.status) {
      case 'error':
        return 'text-destructive';
      case 'complete':
        return 'text-green-500';
      case 'processing':
      case 'uploading':
        return 'text-pdf-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProgressColor = () => {
    switch (status.status) {
      case 'error':
        return 'bg-destructive';
      case 'complete':
        return 'bg-green-500';
      case 'processing':
      case 'uploading':
        return 'bg-pdf-primary';
      default:
        return 'bg-muted';
    }
  };

  const isActive = status.status === 'uploading' || status.status === 'processing';

  return (
    <div className={cn('w-full space-y-2', className)}>
      <div className="flex justify-between items-center">
        <p className={cn("text-sm font-medium", getStatusColor())}>
          {status.message || "Ready to upload"}
        </p>
        <span className={cn("text-xs", getStatusColor())}>
          {status.progress}%
        </span>
      </div>
      
      <Progress 
        value={status.progress} 
        className={cn(
          "h-2 transition-all duration-300",
          isActive && "animate-pulse-opacity",
          getProgressColor()
        )}
      />
    </div>
  );
};

export default ProgressIndicator;
