'use client';

import { useState, useEffect } from 'react';
import { Farmer, UpdateFarmerData } from '@/types/farmer';
import { apiService } from '@/services/api';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DatePicker } from './DatePicker';
import { formatDateForAPI, parseDateFromAPI } from '@/utils/dateUtils';

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
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);

  useEffect(() => {
    if (farmer) {
      setFormData({
        fullName: farmer.fullName,
        phone: farmer.phone || '',
        isActive: farmer.isActive,
      });
      // Set birthDate as Date object (avoid timezone issues)
      if (farmer.birthDate) {
        setBirthDate(parseDateFromAPI(farmer.birthDate));
      } else {
        setBirthDate(null);
      }
    }
  }, [farmer]);

  // Limpar erro quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setLoading(false);
      setBirthDateError(null);
      setBirthDate(null);
    }
  }, [isOpen]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmer) return;

    // Validar data de nascimento
    if (birthDate && birthDate > new Date()) {
      setBirthDateError('A data de nascimento não pode ser no futuro');
      return;
    }

    setLoading(true);
    setError(null);
    setBirthDateError(null);

    try {
      const updateData: UpdateFarmerData = { ...formData };
      
      if (birthDate) {
        // Format date as YYYY-MM-DD for API (avoid timezone issues)
        updateData.birthDate = formatDateForAPI(birthDate);
      } else {
        updateData.birthDate = undefined;
      }

      await apiService.updateFarmer(farmer.id, updateData);
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar agricultor');
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara do telefone
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    return value;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      phone: formatted,
    }));
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
              <DatePicker
                label="Data de Nascimento"
                value={birthDate}
                onChange={setBirthDate}
                placeholder="Selecionar data de nascimento"
                error={birthDateError || undefined}
                onBlur={() => {
                  if (birthDate && birthDate > new Date()) {
                    setBirthDateError('A data de nascimento não pode ser no futuro');
                  } else {
                    setBirthDateError(null);
                  }
                }}
              />
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
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                maxLength={15}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive || false}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label 
                  htmlFor="isActive" 
                  className={`w-4 h-4 border-2 rounded transition-colors cursor-pointer flex items-center justify-center ${
                    formData.isActive 
                      ? 'bg-indigo-600 border-indigo-600' 
                      : 'bg-white border-indigo-300'
                  }`}
                >
                  {formData.isActive && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 cursor-pointer">
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


