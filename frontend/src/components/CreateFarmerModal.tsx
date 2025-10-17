'use client';

import { useState, useEffect } from 'react';
import { CreateFarmerData } from '@/types/farmer';
import { apiService } from '@/services/api';
import { DatePicker } from './DatePicker';
import { formatDateForAPI } from '@/utils/dateUtils';
import { Modal, Button, InputField, ErrorMessage } from './';

interface CreateFarmerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function CreateFarmerModal({ 
  isOpen, 
  onClose, 
  onSave 
}: CreateFarmerModalProps) {
  const [formData, setFormData] = useState<CreateFarmerData>({
    fullName: '',
    cpf: '',
    birthDate: '',
    phone: '',
    isActive: true,
  });
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);

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
    
    // Validar data de nascimento
    if (birthDate && birthDate > new Date()) {
      setBirthDateError('A data de nascimento não pode ser no futuro');
      return;
    }
    
    setLoading(true);
    setError(null);
    setBirthDateError(null);

    try {
      // Limpar dados vazios
      const cleanData: CreateFarmerData = {
        fullName: formData.fullName,
        cpf: formData.cpf,
        isActive: formData.isActive,
      };

      if (birthDate) {
        // Format date as YYYY-MM-DD for API (avoid timezone issues)
        cleanData.birthDate = formatDateForAPI(birthDate);
      }

      if (formData.phone) {
        cleanData.phone = formData.phone;
      }

      await apiService.createFarmer(cleanData);
      onSave();
      onClose();
      // Reset form
      setFormData({
        fullName: '',
        cpf: '',
        birthDate: '',
        phone: '',
        isActive: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar agricultor');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateFarmerData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Novo Agricultor"
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
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            placeholder="Digite o nome completo"
            required
          />

          <InputField
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange('cpf')}
            mask="cpf"
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
            value={formData.phone}
            onChange={handleInputChange('phone')}
            mask="phone"
            type="tel"
          />
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
            {loading ? 'Criando...' : 'Criar Agricultor'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
