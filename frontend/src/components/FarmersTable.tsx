'use client';

import { memo } from 'react';
import { Farmer } from '@/types/farmer';
import { 
  EllipsisVerticalIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';
import { parseDateFromAPI } from '@/utils/dateUtils';
import { StatusBadge, DropdownMenu } from './';

interface FarmersTableProps {
  farmers: Farmer[];
  onEdit: (farmer: Farmer) => void;
  onDelete: (farmer: Farmer) => void;
  onToggleStatus: (farmer: Farmer) => void;
}

const FarmersTable = memo(function FarmersTable({ 
  farmers, 
  onEdit, 
  onDelete, 
  onToggleStatus
}: FarmersTableProps) {

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    try {
      // Use parseDateFromAPI to avoid timezone issues
      const date = parseDateFromAPI(dateString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return '-';
      }
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return '-';
    }
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone: string | undefined) => {
    if (!phone) return '-';
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const getMenuItems = (farmer: Farmer) => [
    {
      id: 'edit',
      label: 'Editar',
      icon: <PencilIcon className="h-4 w-4" />,
      onClick: () => onEdit(farmer)
    },
    {
      id: 'toggle-status',
      label: farmer.isActive ? 'Desativar' : 'Ativar',
      icon: farmer.isActive ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />,
      onClick: () => onToggleStatus(farmer)
    },
    {
      id: 'delete',
      label: 'Excluir',
      icon: <TrashIcon className="h-4 w-4" />,
      onClick: () => onDelete(farmer),
      variant: 'danger' as const
    }
  ];

  return (
    <div className="overflow-x-auto overflow-y-visible min-h-[500px]">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CPF
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data de Nascimento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Telefone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {farmers.map((farmer) => (
            <tr key={farmer.id} className="hover:bg-gray-50">
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {farmer.fullName}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                {formatCPF(farmer.cpf)}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                {formatDate(farmer.birthDate)}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                {formatPhone(farmer.phone)}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <StatusBadge status={farmer.isActive} />
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                <DropdownMenu
                  trigger={
                    <button className="text-gray-400 hover:text-gray-600 focus:outline-none rounded-full p-1">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                  }
                  items={getMenuItems(farmer)}
                  position="right"
                />
              </td>
            </tr>
          ))}
          {farmers.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-gray-400 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">Nenhum agricultor encontrado</p>
                  <p className="text-gray-400 text-sm mt-1">Adicione agricultores para começar</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default FarmersTable;