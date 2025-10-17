'use client';

import React, { useState, useCallback } from 'react';
import { formatCPF, formatPhone, formatCEP, unformatCPF, unformatPhone, unformatCEP } from '@/utils/formMasks';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  mask?: 'cpf' | 'phone' | 'cep' | 'none';
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required = false,
  disabled = false,
  maxLength,
  mask = 'none',
  className = '',
  labelClassName = '',
  inputClassName = ''
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getMaskFunction = useCallback(() => {
    switch (mask) {
      case 'cpf':
        return formatCPF;
      case 'phone':
        return formatPhone;
      case 'cep':
        return formatCEP;
      default:
        return (value: string) => value;
    }
  }, [mask]);

  const getUnmaskFunction = useCallback(() => {
    switch (mask) {
      case 'cpf':
        return unformatCPF;
      case 'phone':
        return unformatPhone;
      case 'cep':
        return unformatCEP;
      default:
        return (value: string) => value;
    }
  }, [mask]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (mask !== 'none') {
      const maskFunction = getMaskFunction();
      const formattedValue = maskFunction(inputValue);
      onChange(formattedValue);
    } else {
      onChange(inputValue);
    }
  }, [mask, onChange, getMaskFunction]);

  const getMaxLength = useCallback(() => {
    if (maxLength) return maxLength;
    
    switch (mask) {
      case 'cpf':
        return 14; // XXX.XXX.XXX-XX
      case 'phone':
        return 15; // (XX) XXXXX-XXXX
      case 'cep':
        return 9; // XXXXX-XXX
      default:
        return undefined;
    }
  }, [mask, maxLength]);

  const getPlaceholder = useCallback(() => {
    if (placeholder) return placeholder;
    
    switch (mask) {
      case 'cpf':
        return '000.000.000-00';
      case 'phone':
        return '(00) 00000-0000';
      case 'cep':
        return '00000-000';
      default:
        return '';
    }
  }, [mask, placeholder]);

  const baseInputClasses = `mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${
    error 
      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
  } ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white"} ${inputClassName}`;

  return (
    <div className={className}>
      <label 
        htmlFor={name} 
        className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={getPlaceholder()}
        maxLength={getMaxLength()}
        required={required}
        disabled={disabled}
        className={baseInputClasses}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
