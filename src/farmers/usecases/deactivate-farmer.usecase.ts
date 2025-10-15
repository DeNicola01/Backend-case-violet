import { Injectable, NotFoundException } from '@nestjs/common';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from '../repositories/farmer.repository';

@Injectable()
export class DeactivateFarmerUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(id: string): Promise<Farmer> {
    // Busca o agricultor existente
    const farmer = await this.farmerRepository.findById(id);
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }

    // Desativa o agricultor usando o model
    const deactivatedFarmer = farmer.deactivate();

    // Salva no repositório
    return this.farmerRepository.update(deactivatedFarmer);
  }
}
