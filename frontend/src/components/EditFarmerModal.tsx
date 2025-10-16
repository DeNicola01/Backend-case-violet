'use client';

import { useState, useEffect } from 'react';
import { Farmer, UpdateFarmerData } from '@/types/farmer';
import { apiService } from '@/services/api';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface EditFarmerModalProps {
  farmer: Farmer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function EditFarmerModal({ 
  farmer, 
  isOpen, 
  onClose, 
  onSave 
}: EditFarmerModalProps) {
  const [formData, setFormData] = useState<UpdateFarmerData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);

  useEffect(() => {
    if (farmer) {
      setFormData({
        fullName: farmer.fullName,
        birthDate: farmer.birthDate ? farmer.birthDate.split('T')[0] : '',
        phone: farmer.phone || '',
        isActive: farmer.isActive,
      });
    }
  }, [farmer]);

  // Limpar erro quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setLoading(false);
      setBirthDateError(null);
    }
  }, [isOpen]);

  const validateBirthDate = (dateString: string) => {
    if (!dateString) return true; // Data opcional
    
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Fim do dia atual
    
    return selectedDate <= today;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmer) return;

    // Validar data de nascimento
    if (formData.birthDate && !validateBirthDate(formData.birthDate)) {
      setBirthDateError('A data de nascimento não pode ser no futuro');
      return;
    }

    setLoading(true);
    setError(null);
    setBirthDateError(null);

    try {
      await apiService.updateFarmer(farmer.id, formData);
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar agricultor');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      birthDate: value,
    }));
    
    // Validar em tempo real
    if (value && !validateBirthDate(value)) {
      setBirthDateError('A data de nascimento não pode ser no futuro');
    } else {
      setBirthDateError(null);
    }
  };

  if (!isOpen || !farmer) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Editar Agricultor
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate || ''}
                onChange={handleBirthDateChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  birthDateError ? 'border-red-300' : 'border-gray-300'
                }`}
                max={new Date().toISOString().split('T')[0]}
              />
              {birthDateError && (
                <p className="mt-1 text-sm text-red-600">{birthDateError}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive || false}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Agricultor ativo
              </label>
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
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


