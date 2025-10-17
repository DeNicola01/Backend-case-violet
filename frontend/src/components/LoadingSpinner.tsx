'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  text?: string;
  className?: string;
  textClassName?: string;
  centered?: boolean;
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  text,
  className = '',
  textClassName = '',
  centered = false
}: LoadingSpinnerProps) {
  const getSizeClasses = () => {
    const sizes = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16'
    };
    
    return sizes[size];
  };

  const getColorClasses = () => {
    const colors = {
      primary: 'border-indigo-600',
      secondary: 'border-gray-600',
      white: 'border-white',
      gray: 'border-gray-400'
    };
    
    return colors[color];
  };

  const getTextColorClasses = () => {
    const colors = {
      primary: 'text-indigo-600',
      secondary: 'text-gray-600',
      white: 'text-white',
      gray: 'text-gray-400'
    };
    
    return colors[color];
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-b-2 ${getSizeClasses()} ${getColorClasses()} ${className}`} />
  );

  if (!text) {
    return spinner;
  }

  const content = (
    <div className={`flex flex-col items-center ${centered ? 'justify-center' : ''}`}>
      {spinner}
      <p className={`mt-2 text-sm font-medium ${getTextColorClasses()} ${textClassName}`}>
        {text}
      </p>
    </div>
  );

  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        {content}
      </div>
    );
  }

  return content;
}
