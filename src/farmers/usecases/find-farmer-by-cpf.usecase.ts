import { Injectable, NotFoundException } from '@nestjs/common';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from '../repositories/farmer.repository';

@Injectable()
export class FindFarmerByCpfUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(cpf: string): Promise<Farmer> {
    const farmer = await this.farmerRepository.findByCpf(cpf);
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado com este CPF');
    }
    return farmer;
  }
}
