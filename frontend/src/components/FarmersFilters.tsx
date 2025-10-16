'use client';
import { memo, useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FarmersFiltersProps {
  searchValue: string;
  statusValue: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
  onCreateFarmer: () => void;
}

const FarmersFilters = memo(function FarmersFilters({ 
  searchValue, 
  statusValue, 
  onSearchChange, 
  onStatusChange,
  onClearFilters,
  onCreateFarmer
}: FarmersFiltersProps) {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if any filters are active
  const hasActiveFilters = Boolean(searchValue || statusValue !== '');

  const getStatusLabel = (value: string) => {
    switch (value) {
      case 'true': return 'Ativo';
      case 'false': return 'Inativo';
      default: return 'Todos os status';
    }
  };

  const handleStatusSelect = (value: string) => {
    onStatusChange(value);
    setIsStatusDropdownOpen(false);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar por nome ou CPF..."
            className="block w-full h-10 bg-white border border-gray-300 rounded-md px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="w-48 relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            className="flex items-center justify-between w-full h-10 border border-gray-300 rounded-md px-3 text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <span className="text-sm">{getStatusLabel(statusValue)}</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </button>
          
          {isStatusDropdownOpen && (
            <div className="absolute right-0 mt-1 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button
                  onClick={() => handleStatusSelect('')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Todos os status
                </button>
                <button
                  onClick={() => handleStatusSelect('true')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Ativo
                </button>
                <button
                  onClick={() => handleStatusSelect('false')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Inativo
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            hasActiveFilters
              ? 'text-red-500 hover:text-red-700 bg-white border border-red-300 hover:bg-red-50 cursor-pointer'
              : 'text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed'
          }`}
          title={hasActiveFilters ? "Limpar filtros" : "Nenhum filtro ativo"}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <button
          onClick={onCreateFarmer}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Novo Agricultor
        </button>
      </div>
    </div>
  );
});

export default FarmersFilters;