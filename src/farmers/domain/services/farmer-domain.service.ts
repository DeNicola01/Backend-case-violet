import { Inject, Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { Farmer } from '../entities/farmer.entity';
import { CPF } from '../value-objects/cpf.vo';
import { FarmerRepository, FARMER_REPOSITORY } from '../repositories/farmer.repository';

@Injectable()
export class FarmerDomainService {
  constructor(
    @Inject(FARMER_REPOSITORY)
    private readonly farmerRepository: FarmerRepository,
  ) {}

  async ensureCpfIsUnique(cpf: CPF, excludeFarmerId?: string): Promise<void> {
    const existingFarmer = await this.farmerRepository.findByCpf(cpf);
    
    if (existingFarmer && (!excludeFarmerId || existingFarmer.id.getValue() !== excludeFarmerId)) {
      throw new ConflictException('Já existe um agricultor cadastrado com este CPF');
    }
  }

  canDeleteFarmer(farmer: Farmer): boolean {
    return farmer.canBeDeleted();
  }

  validateFarmerForDeletion(farmer: Farmer): void {
    if (!this.canDeleteFarmer(farmer)) {
      throw new BadRequestException('Não é possível excluir um agricultor ativo. Desative primeiro o agricultor.');
    }
  }
}
