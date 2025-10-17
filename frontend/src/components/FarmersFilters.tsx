'use client';
import { memo } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SelectFilter, SelectOption } from './SelectFilter';

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
  // Check if any filters are active
  const hasActiveFilters = Boolean(searchValue || statusValue !== '');

  // Status options for the select filter
  const statusOptions: SelectOption[] = [
    { value: '', label: 'Todos os status' },
    { value: 'true', label: 'Ativo' },
    { value: 'false', label: 'Inativo' }
  ];

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

        <SelectFilter
          value={statusValue}
          onChange={onStatusChange}
          options={statusOptions}
          placeholder="Todos os status"
          position="right"
          fixedWidth={true}
        />

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