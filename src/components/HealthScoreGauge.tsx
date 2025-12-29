import { cn } from '@/lib/utils';

interface HealthScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export const HealthScoreGauge = ({ score, size = 'md' }: HealthScoreGaugeProps) => {
  const percentage = (score / 10) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (score >= 7) return 'stroke-safe';
    if (score >= 5) return 'stroke-moderate';
    return 'stroke-high-risk';
  };

  const getGlowColor = () => {
    if (score >= 7) return 'drop-shadow-[0_0_8px_hsl(var(--safe)/0.5)]';
    if (score >= 5) return 'drop-shadow-[0_0_8px_hsl(var(--moderate)/0.5)]';
    return 'drop-shadow-[0_0_8px_hsl(var(--high-risk)/0.5)]';
  };

  const dimensions = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };

  const textSize = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <div className={cn("relative", dimensions[size])}>
      <svg className={cn("transform -rotate-90 w-full h-full", getGlowColor())} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className={cn(getColor(), "transition-all duration-1000 ease-out")}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-display font-bold text-foreground", textSize[size])}>
          {score}
        </span>
        <span className="text-xs text-muted-foreground font-medium">/ 10</span>
      </div>
    </div>
  );
};
