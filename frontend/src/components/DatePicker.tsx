"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

// Estilos customizados para scrollbar (mesmo estilo da timeline)
const datePickerScrollStyles = `
  .date-picker-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .date-picker-scroll::-webkit-scrollbar-track {
    background: #D9D9D9;
    border-radius: 10px;
  }
  .date-picker-scroll::-webkit-scrollbar-thumb {
    background: #949494;
    border-radius: 10px;
  }
  .date-picker-scroll::-webkit-scrollbar-thumb:hover {
    background: #1B2D64;
  }
`;

interface DatePickerProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  onBlur,
  placeholder = "Selecionar data",
  error,
  isValid,
  required = false,
  className,
  label,
  labelClassName,
  disabled = false
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const yearPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && value instanceof Date && !isNaN(value.getTime())) {
      setSelectedDate(value);
      setCurrentMonth(value);
    } else {
      setSelectedDate(null);
      // Keep currentMonth as is, don't reset it
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur]);

  // Scroll to selected year when year picker opens
  useEffect(() => {
    if (showYearPicker && yearPickerRef.current) {
      // Use setTimeout to ensure the DOM is fully rendered
      setTimeout(() => {
        if (yearPickerRef.current) {
          const currentYear = currentMonth.getFullYear();
          const yearButtons = yearPickerRef.current.querySelectorAll('button');
          
          // Find the button for the current year
          const currentYearButton = Array.from(yearButtons).find(
            button => parseInt(button.textContent || '') === currentYear
          );
          
          if (currentYearButton) {
            // Scroll the button into view, centered
            currentYearButton.scrollIntoView({
              block: 'center',
              behavior: 'auto'
            });
          }
        }
      }, 0);
    }
  }, [showYearPicker, currentMonth]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateSelect = (date: Date) => {
    // Fix timezone issue by creating a new date with local timezone
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(localDate);
    onChange(localDate);
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    // Ensure date is a valid Date object
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      const days = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
      
      return days;
    }
    
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setFullYear(prev.getFullYear() - 1);
      } else {
        newMonth.setFullYear(prev.getFullYear() + 1);
      }
      return newMonth;
    });
  };

  const selectYear = (year: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setFullYear(year);
      return newMonth;
    });
    setShowYearPicker(false);
    setShowMonthPicker(true);
  };

  const selectMonth = (monthIndex: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(monthIndex);
      return newMonth;
    });
    setShowMonthPicker(false);
  };

  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      years.push(year);
    }
    return years;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <>
      <style>{datePickerScrollStyles}</style>
      <div className="relative" ref={dropdownRef}>
        {label && (
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName || ''}`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`flex h-10 w-full min-w-0 rounded-md border bg-white px-3 py-2 text-sm transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${
            error 
              ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          } ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""} ${className || ""}`}
        >
          <div className="flex items-center w-full">
            <span className={`block truncate flex-1 text-left ${
              selectedDate ? "text-gray-900" : "text-gray-500"
            }`}>
              {selectedDate ? formatDate(selectedDate) : placeholder}
            </span>
            <div className="flex items-center ml-2 flex-shrink-0">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowYearPicker(!showYearPicker);
                    setShowMonthPicker(false);
                  }}
                  className="text-sm font-medium text-gray-900 hover:bg-gray-100 px-3 py-1 rounded"
                >
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              </div>

              {/* Year Picker */}
              {showYearPicker && (
                <div className="mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div 
                    ref={yearPickerRef} 
                    className="date-picker-scroll max-h-32 overflow-y-auto"
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
                      gap: '4px'
                    }}
                  >
                    {getYearRange().map(year => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => selectYear(year)}
                        className={`text-xs sm:text-sm py-1 px-1 sm:px-2 rounded hover:bg-gray-200 transition-colors whitespace-nowrap ${
                          year === currentMonth.getFullYear() 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "text-gray-900"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Month Picker */}
              {showMonthPicker && (
                <div className="mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div 
                    className="max-h-32 overflow-y-auto"
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                      gap: '4px'
                    }}
                  >
                    {monthNames.map((month, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectMonth(index)}
                        className={`text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-3 rounded hover:bg-gray-200 transition-colors whitespace-nowrap ${
                          index === currentMonth.getMonth() 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "text-gray-900"
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Days of week */}
              {!showYearPicker && !showMonthPicker && (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                      <div key={day} className="text-xs text-gray-500 text-center py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((date, index) => {
                      if (!date) {
                        return <div key={index} className="h-8" />;
                      }

                      // Type guard to ensure date is a Date object
                      if (!(date instanceof Date)) {
                        return <div key={index} className="h-8" />;
                      }

                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          onClick={() => handleDateSelect(date)}
                          className={`h-8 w-8 text-sm rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isToday(date) ? "bg-blue-50 text-blue-600 font-medium" : ""
                          } ${
                            isSelected(date) ? "bg-blue-600 text-white hover:bg-blue-700" : ""
                          } ${
                            !isToday(date) && !isSelected(date) ? "text-gray-900" : ""
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    </>
  );
}
