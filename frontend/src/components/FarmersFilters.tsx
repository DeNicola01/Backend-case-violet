'use client';

import { useRef, memo } from 'react';
import { FindFarmersFilters } from '@/types/farmer';

interface FarmersFiltersProps {
  searchValue: string;
  statusValue: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onFiltersChange: (filters: FindFarmersFilters) => void;
}

const FarmersFilters = memo(function FarmersFilters({ 
  searchValue, 
  statusValue, 
  onSearchChange, 
  onStatusChange, 
  onFiltersChange 
}: FarmersFiltersProps) {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    
    // Limpar timer anterior
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Criar novo timer
    debounceTimer.current = setTimeout(() => {
      const newFilters: FindFarmersFilters = {};
      
      // Adicionar filtro de status se selecionado
      if (statusValue !== '') {
        newFilters.isActive = statusValue === 'true';
      }
      
      // Adicionar filtro de pesquisa se preenchido
      if (value.trim() !== '') {
        // Se o valor contém apenas números, pontos, hífens e espaços, é provavelmente um CPF
        const isCpf = /^[\d.\-\s]*$/.test(value) && value.replace(/\D/g, '').length > 0;
        
        if (isCpf) {
          newFilters.cpf = value;
        } else {
          newFilters.name = value;
        }
      }
      
      onFiltersChange(newFilters);
    }, 300);
  };

  const handleStatusChange = (value: string) => {
    onStatusChange(value);
    
    // Limpar timer anterior se existir
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Aplicar filtro imediatamente para status
    debounceTimer.current = setTimeout(() => {
      const newFilters: FindFarmersFilters = {};
      
      // Adicionar filtro de status se selecionado
      if (value !== '') {
        newFilters.isActive = value === 'true';
      }
      
      // Adicionar filtro de pesquisa se preenchido
      if (searchValue.trim() !== '') {
        const isCpf = /^[\d.\-\s]*$/.test(searchValue) && searchValue.replace(/\D/g, '').length > 0;
        
        if (isCpf) {
          newFilters.cpf = searchValue;
        } else {
          newFilters.name = searchValue;
        }
      }
      
      onFiltersChange(newFilters);
    }, 100); // Delay menor para status
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Pesquisar por nome ou CPF..."
            className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="w-48">
          <select
            value={statusValue}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Todos os status</option>
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
      </div>
    </div>
  );
});

export default FarmersFilters;
