'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger';
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  position?: 'left' | 'right' | 'center';
  width?: string;
  className?: string;
  menuClassName?: string;
  disabled?: boolean;
}

export function DropdownMenu({
  trigger,
  items,
  position = 'right',
  width = 'w-48',
  className = '',
  menuClassName = '',
  disabled = false
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-0';
      case 'center':
        return 'left-1/2 transform -translate-x-1/2';
      default:
        return 'right-0';
    }
  };

  const handleToggle = () => {
    if (disabled) return;
    
    if (isOpen) {
      setIsOpen(false);
      setMenuPosition(null);
    } else {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + window.scrollY + 4,
          left: position === 'left' 
            ? rect.left + window.scrollX 
            : position === 'center'
            ? rect.left + window.scrollX + (rect.width / 2)
            : rect.right + window.scrollX - (width === 'w-48' ? 192 : 0)
        });
      }
      setIsOpen(true);
    }
  };

  const handleItemClick = (item: DropdownMenuItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
      setMenuPosition(null);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setMenuPosition(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setMenuPosition(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const getItemClasses = (item: DropdownMenuItem) => {
    const baseClasses = 'flex items-center w-full px-4 py-2 text-sm transition-colors';
    const variantClasses = item.variant === 'danger' 
      ? 'text-red-600 hover:bg-red-50' 
      : 'text-gray-700 hover:bg-gray-100';
    const disabledClasses = item.disabled 
      ? 'opacity-50 cursor-not-allowed' 
      : 'cursor-pointer';
    
    return `${baseClasses} ${variantClasses} ${disabledClasses}`;
  };

  return (
    <>
      <div 
        ref={triggerRef}
        className={`relative ${className}`}
        onClick={handleToggle}
      >
        {trigger}
      </div>

      {/* Portal para o dropdown */}
      {isOpen && menuPosition && typeof window !== 'undefined' && createPortal(
        <div 
          ref={menuRef}
          className={`fixed z-[9999] bg-white rounded-md shadow-xl border border-gray-200 ${width} ${getPositionClasses()} ${menuClassName}`}
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`
          }}
        >
          <div className="py-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={getItemClasses(item)}
              >
                {item.icon && (
                  <span className="mr-2 flex-shrink-0">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
