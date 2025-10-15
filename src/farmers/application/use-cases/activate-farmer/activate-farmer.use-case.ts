import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Farmer } from '../../../domain/entities/farmer.entity';
import { FarmerRepository, FARMER_REPOSITORY } from '../../../domain/repositories/farmer.repository';
import { FarmerId } from '../../../domain/value-objects/farmer-id.vo';

@Injectable()
export class ActivateFarmerUseCase {
  constructor(
    @Inject(FARMER_REPOSITORY)
    private readonly farmerRepository: FarmerRepository,
  ) {}

  /**
   * Ativa um agricultor
   * @param id - ID do agricultor a ser ativado
   * @returns Promise<Farmer> - Agricultor ativado
   * @throws NotFoundException se agricultor não for encontrado
   */
  async execute(id: string): Promise<Farmer> {
    const farmerId = new FarmerId(id);
    const farmer = await this.farmerRepository.findById(farmerId);
    
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }

    farmer.activate();
    const updatedFarmer = await this.farmerRepository.update(farmer);
    updatedFarmer.clearDomainEvents();

    return updatedFarmer;
  }
}
