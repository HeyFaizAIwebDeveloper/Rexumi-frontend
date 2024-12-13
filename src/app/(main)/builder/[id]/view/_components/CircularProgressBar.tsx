import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularProgress({
  value,
  size = 200,
  strokeWidth = 12,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (score: number): string => {
    if (score >= 90) return '#228B22'; // Dark Green for excellent scores
    if (score >= 75) return '#4CAF50'; // Green for very good scores
    if (score >= 60) return '#FFD700'; // Gold for good scores
    if (score >= 40) return '#FFA500'; // Orange for average scores
    if (score >= 20) return '#FF6347'; // Tomato for below-average scores
    return '#FF4D4D'; // Red for poor scores
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-secondary/30 stroke-current"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-500 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={getColor(value)}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center select-none">
        <span className="text-4xl font-bold">{value}%</span>
        <span className="text-sm text-muted-foreground">Overall Score</span>
      </div>
    </div>
  );
}