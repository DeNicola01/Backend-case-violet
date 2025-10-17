'use client';

import { useState, useEffect } from 'react';
import { Farmer, UpdateFarmerData } from '@/types/farmer';
import { apiService } from '@/services/api';
import { DatePicker } from './DatePicker';
import { formatDateForAPI, parseDateFromAPI } from '@/utils/dateUtils';
import { Modal, Button, InputField, ErrorMessage } from './';

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

  const handleInputChange = (field: keyof UpdateFarmerData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: keyof UpdateFarmerData) => (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked,
    }));
  };


  if (!isOpen || !farmer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Agricultor"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <ErrorMessage
            message={error}
            type="error"
            className="mb-4"
          />
        )}

        <div className="space-y-4">
          <InputField
            label="Nome Completo"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleInputChange('fullName')}
            required
          />

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

          <InputField
            label="Telefone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleInputChange('phone')}
            mask="phone"
            type="tel"
          />

          <div className="flex items-center">
            <div className="relative">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive || false}
                onChange={(e) => handleCheckboxChange('isActive')(e.target.checked)}
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
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}


