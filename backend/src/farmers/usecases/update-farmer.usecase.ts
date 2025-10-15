import { Injectable, NotFoundException } from '@nestjs/common';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from '../repositories/farmer.repository';
import { UpdateFarmerDto } from '../dto/update-farmer.dto';

@Injectable()
export class UpdateFarmerUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(id: string, updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
    // Busca o agricultor existente
    const existingFarmer = await this.farmerRepository.findById(id);
    if (!existingFarmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }

    // Atualiza o agricultor usando o model
    const updatedFarmer = existingFarmer.update(
      updateFarmerDto.fullName,
      updateFarmerDto.birthDate ? new Date(updateFarmerDto.birthDate) : undefined,
      updateFarmerDto.phone,
      updateFarmerDto.isActive,
    );

    // Salva no repositório
    return this.farmerRepository.update(updatedFarmer);
  }
}
