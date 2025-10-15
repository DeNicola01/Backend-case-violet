export class FarmerId {
  private readonly value: string;

  constructor(id: string) {
    if (!id || id.trim().length === 0) {
      throw new Error('ID do agricultor é obrigatório');
    }
    this.value = id.trim();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: FarmerId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  static generate(): FarmerId {
    // Em um cenário real, isso seria gerado pelo banco de dados
    // Por enquanto, vamos usar um UUID simples
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return new FarmerId(uuid);
  }
}
