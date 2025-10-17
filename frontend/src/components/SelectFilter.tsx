'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  icon?: ReactNode;
  onBlur?: () => void;
  position?: 'left' | 'right' | 'center';
  width?: string;
  fixedWidth?: boolean;
}

export function SelectFilter({
  value,
  onChange,
  options,
  placeholder = "Selecionar...",
  label,
  error,
  required = false,
  disabled = false,
  className = "",
  labelClassName = "",
  buttonClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  icon,
  onBlur,
  position = 'left',
  width = 'w-full',
  fixedWidth = false
}: SelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected option
  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur]);

  const getPositionClasses = () => {
    switch (position) {
      case 'right':
        return 'right-0';
      case 'center':
        return 'left-1/2 transform -translate-x-1/2';
      default:
        return 'left-0';
    }
  };

  const buttonWidthClass = fixedWidth ? 'w-48' : width;
  
  const baseButtonClasses = `flex items-center justify-between h-10 border rounded-md px-3 text-sm transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${
    error 
      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
  } ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white hover:bg-gray-50"} ${buttonWidthClass} ${buttonClassName}`;

  const baseDropdownClasses = `absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg ${getPositionClasses()} mt-1 ${buttonWidthClass} ${dropdownClassName}`;

  const baseOptionClasses = `flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${optionClassName}`;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={baseButtonClasses}
      >
        <div className="flex items-center w-full">
          <span className={`block truncate flex-1 text-left ${
            selectedOption ? "text-gray-900" : "text-gray-500"
          }`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center ml-2 flex-shrink-0">
            {icon && <span className="mr-2">{icon}</span>}
            <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className={baseDropdownClasses}>
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                className={`${baseOptionClasses} ${
                  option.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer'
                } ${
                  option.value === value 
                    ? 'bg-indigo-50 text-indigo-700 font-medium' 
                    : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
