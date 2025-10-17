'use client';

import { useState, useEffect } from 'react';
import { Farmer } from '@/types/farmer';
import { apiService } from '@/services/api';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Modal, Button, ErrorMessage } from './';

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Exclusão"
      size="md"
    >
      {error && (
        <ErrorMessage
          message={error}
          type="error"
          className="mb-4"
        />
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
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          variant="danger"
          loading={loading}
          disabled={loading || farmer.isActive}
        >
          {loading ? 'Excluindo...' : 'Excluir'}
        </Button>
      </div>
    </Modal>
  );
}


