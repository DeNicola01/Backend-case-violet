import { Injectable, NotFoundException } from '@nestjs/common';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from '../repositories/farmer.repository';

@Injectable()
export class FindFarmerByIdUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(id: string): Promise<Farmer> {
    const farmer = await this.farmerRepository.findById(id);
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }
    return farmer;
  }
}
