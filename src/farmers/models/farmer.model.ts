export class Farmer {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly cpf: string,
    public readonly birthDate?: Date,
    public readonly phone?: string,
    public readonly isActive: boolean = true,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}

  static create(
    fullName: string,
    cpf: string,
    birthDate?: Date,
    phone?: string,
    isActive: boolean = true,
  ): Farmer {
    const now = new Date();
    return new Farmer(
      '', // ID será gerado pelo banco
      fullName,
      cpf,
      birthDate,
      phone,
      isActive,
      now,
      now,
    );
  }

  update(
    fullName?: string,
    birthDate?: Date,
    phone?: string,
    isActive?: boolean,
  ): Farmer {
    return new Farmer(
      this.id,
      fullName ?? this.fullName,
      this.cpf, // CPF não pode ser alterado
      birthDate ?? this.birthDate,
      phone ?? this.phone,
      isActive ?? this.isActive,
      this.createdAt,
      new Date(), // updatedAt sempre atualizado
    );
  }

  deactivate(): Farmer {
    return this.update(undefined, undefined, undefined, false);
  }

  activate(): Farmer {
    return this.update(undefined, undefined, undefined, true);
  }

  canBeDeleted(): boolean {
    return !this.isActive;
  }
}
