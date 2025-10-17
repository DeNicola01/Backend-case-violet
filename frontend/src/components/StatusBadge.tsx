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
        ? 'bg-green-600 text-white border border-green-600'
        : 'bg-red-600 text-white border border-red-600';
    }
    
    // default variant
    return isActive
      ? 'bg-green-100 text-green-800 border border-green-800'
      : 'bg-red-100 text-red-800 border border-red-800';
  };

  const baseClasses = `inline-flex items-center font-medium rounded-full transition-colors ${getSizeClasses()} ${getVariantClasses()} ${className}`;

  return (
    <span className={baseClasses}>
      {isActive ? activeText : inactiveText}
    </span>
  );
}
