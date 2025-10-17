'use client';

import React from 'react';
import { ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorMessage({
  message,
  type = 'error',
  size = 'md',
  showIcon = true,
  dismissible = false,
  onDismiss,
  className = ''
}: ErrorMessageProps) {
  const getTypeClasses = () => {
    const types = {
      error: 'bg-red-100 border-red-400 text-red-700',
      warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
      info: 'bg-blue-100 border-blue-400 text-blue-700'
    };
    
    return types[type];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'p-2 text-xs',
      md: 'p-3 text-sm',
      lg: 'p-4 text-base'
    };
    
    return sizes[size];
  };

  const getIcon = () => {
    if (!showIcon) return null;
    
    const iconClasses = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
    
    switch (type) {
      case 'error':
        return <XCircleIcon className={`${iconClasses} mr-2 flex-shrink-0`} />;
      case 'warning':
        return <ExclamationTriangleIcon className={`${iconClasses} mr-2 flex-shrink-0`} />;
      case 'info':
        return <InformationCircleIcon className={`${iconClasses} mr-2 flex-shrink-0`} />;
      default:
        return null;
    }
  };

  const baseClasses = `rounded border flex items-start ${getTypeClasses()} ${getSizeClasses()} ${className}`;

  return (
    <div className={baseClasses}>
      {getIcon()}
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-2 flex-shrink-0 text-current hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded"
        >
          <XCircleIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
