'use client';

import { useState, memo } from 'react';
import { Farmer } from '@/types/farmer';
import { 
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone?: string) => {
    if (!phone) return '-';
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleMenuToggle = (farmerId: string) => {
    setActiveMenu(activeMenu === farmerId ? null : farmerId);
  };

  const handleAction = async (action: string, farmer: Farmer) => {
    setActiveMenu(null);
    
    try {
      switch (action) {
        case 'edit':
          onEdit(farmer);
          break;
        case 'delete':
          onDelete(farmer);
          break;
        case 'toggle':
          await onToggleStatus(farmer);
          break;
      }
    } catch (error) {
      console.error('Erro ao executar ação:', error);
    }
  };

  return (
    <div className="overflow-x-auto min-h-[600px]">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data de Criação
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {farmers.map((farmer) => (
            <tr key={farmer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {farmer.fullName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatCPF(farmer.cpf)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {farmer.birthDate ? formatDate(farmer.birthDate) : '-'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatPhone(farmer.phone)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  farmer.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {farmer.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatDate(farmer.createdAt)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="relative">
                  <button
                    onClick={() => handleMenuToggle(farmer.id)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1"
                  >
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                  
                  {activeMenu === farmer.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => handleAction('edit', farmer)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <PencilIcon className="h-4 w-4 mr-3" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleAction('toggle', farmer)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {farmer.isActive ? (
                            <>
                              <XCircleIcon className="h-4 w-4 mr-3" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <CheckCircleIcon className="h-4 w-4 mr-3" />
                              Ativar
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleAction('delete', farmer)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4 mr-3" />
                          Excluir
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {farmers.length === 0 && (
          <tr>
            <td colSpan={7} className="px-6 py-12 text-center">
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
      </table>
    </div>
  );
});

export default FarmersTable;
