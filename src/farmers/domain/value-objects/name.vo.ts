export class Name {
  private readonly value: string;

  constructor(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome é obrigatório');
    }
    
    if (name.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres');
    }

    this.value = name.trim();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Name): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
