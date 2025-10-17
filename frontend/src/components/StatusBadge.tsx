'use client';

import React from 'react';

interface StatusBadgeProps {
  status: boolean | string;
  activeText?: string;
  inactiveText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'solid';
  className?: string;
}

export function StatusBadge({
  status,
  activeText = 'Ativo',
  inactiveText = 'Inativo',
  size = 'md',
  variant = 'default',
  className = ''
}: StatusBadgeProps) {
  const isActive = typeof status === 'boolean' ? status : status === 'true' || status === 'active';
  
  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm'
    };
    
    return sizes[size];
  };

  const getVariantClasses = () => {
    if (variant === 'outline') {
      return isActive
        ? 'border border-green-300 text-green-700 bg-green-50'
        : 'border border-red-300 text-red-700 bg-red-50';
    }
    
    if (variant === 'solid') {
      return isActive
        ? 'bg-green-600 text-white'
        : 'bg-red-600 text-white';
    }
    
    // default variant
    return isActive
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getIcon = () => {
    if (isActive) {
      return (
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    
    return (
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    );
  };

  const baseClasses = `inline-flex items-center font-medium rounded-full transition-colors ${getSizeClasses()} ${getVariantClasses()} ${className}`;

  return (
    <span className={baseClasses}>
      {getIcon()}
      {isActive ? activeText : inactiveText}
    </span>
  );
}
