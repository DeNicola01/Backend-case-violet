'use client';

import { useState, useEffect } from 'react';
import { Farmer } from '@/types/farmer';
import { apiService } from '@/services/api';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmModalProps {
  farmer: Farmer | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ 
  farmer, 
  isOpen, 
  onClose, 
  onConfirm 
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Limpar erro quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (!farmer) return;

    setLoading(true);
    setError(null);

    try {
      await apiService.deleteFarmer(farmer.id);
      onConfirm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir agricultor');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !farmer) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Confirmar Exclusão
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-900">
                Tem certeza que deseja excluir o agricultor{' '}
                <span className="font-medium">{farmer.fullName}</span>?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Esta ação não pode ser desfeita.
              </p>
              {farmer.isActive && (
                <p className="text-sm text-amber-600 mt-2">
                  ⚠️ Este agricultor está ativo. Você precisa desativá-lo primeiro antes de excluir.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={loading || farmer.isActive}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


