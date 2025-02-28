import React from 'react';
import { cn } from '@/utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  className?: string;
  fullScreen?: boolean;
}

/**
 * 로딩 상태를 표시하는 간단한 스피너 컴포넌트
 */
const LoadingSpinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
  fullScreen = false,
}) => {
  // 크기별 클래스
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  // 색상별 클래스
  const colorClasses = {
    primary: 'border-gray-200 border-t-midnight-900',
    white: 'border-white/30 border-t-white',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center min-h-[320px]',
        fullScreen ? 'fixed inset-0 bg-black/20 backdrop-blur-sm z-50' : 'w-full h-20'
      )}
    >
      <div
        className={cn(
          'animate-spin rounded-full',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
      />
    </div>
  );
};

export default LoadingSpinner;
