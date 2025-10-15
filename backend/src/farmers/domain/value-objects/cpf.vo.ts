export class CPF {
  private readonly value: string;

  constructor(cpf: string) {
    if (!this.isValid(cpf)) {
      throw new Error('CPF inválido');
    }
    this.value = this.clean(cpf);
  }

  private clean(cpf: string): string {
    return cpf.replace(/[^\d]/g, '');
  }

  private isValid(cpf: string): boolean {
    const cleaned = this.clean(cpf);

    if (cleaned.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cleaned)) {
      return false;
    }

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleaned.charAt(9))) {
      return false;
    }

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleaned.charAt(10))) {
      return false;
    }

    return true;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CPF): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
