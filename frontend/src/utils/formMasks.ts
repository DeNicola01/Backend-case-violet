/**
 * Utilitários para formatação de campos de formulário
 */

/**
 * Formata CPF com máscara XXX.XXX.XXX-XX
 */
export function formatCPF(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara do CPF
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
  return value;
}

/**
 * Formata telefone com máscara (XX) XXXXX-XXXX
 */
export function formatPhone(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara do telefone
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return value;
}

/**
 * Remove formatação de CPF, retornando apenas números
 */
export function unformatCPF(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Remove formatação de telefone, retornando apenas números
 */
export function unformatPhone(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Valida se o CPF tem 11 dígitos (sem formatação)
 */
export function isValidCPFLength(cpf: string): boolean {
  const numbers = unformatCPF(cpf);
  return numbers.length === 11;
}

/**
 * Valida se o telefone tem 10 ou 11 dígitos (sem formatação)
 */
export function isValidPhoneLength(phone: string): boolean {
  const numbers = unformatPhone(phone);
  return numbers.length === 10 || numbers.length === 11;
}

/**
 * Formata CEP com máscara XXXXX-XXX
 */
export function formatCEP(value: string): string {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 8) {
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  
  return value;
}

/**
 * Remove formatação de CEP, retornando apenas números
 */
export function unformatCEP(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Valida se o CEP tem 8 dígitos (sem formatação)
 */
export function isValidCEPLength(cep: string): boolean {
  const numbers = unformatCEP(cep);
  return numbers.length === 8;
}
