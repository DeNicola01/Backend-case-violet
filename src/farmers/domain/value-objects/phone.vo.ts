export class Phone {
  private readonly value: string;

  constructor(phone?: string) {
    if (phone && phone.trim().length > 0) {
      const cleaned = phone.replace(/[^\d]/g, '');
      if (cleaned.length < 10 || cleaned.length > 11) {
        throw new Error('Telefone deve ter 10 ou 11 dígitos');
      }
      this.value = phone.trim();
    } else {
      this.value = '';
    }
  }

  getValue(): string {
    return this.value;
  }

  hasValue(): boolean {
    return this.value.length > 0;
  }

  equals(other: Phone): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
