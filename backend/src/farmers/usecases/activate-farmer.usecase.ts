import { Injectable, NotFoundException } from '@nestjs/common';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from '../repositories/farmer.repository';

@Injectable()
export class ActivateFarmerUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(id: string): Promise<Farmer> {
    // Busca o agricultor existente
    const farmer = await this.farmerRepository.findById(id);
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }

    // Ativa o agricultor usando o model
    const activatedFarmer = farmer.activate();

    // Salva no repositório
    return this.farmerRepository.update(activatedFarmer);
  }
}
