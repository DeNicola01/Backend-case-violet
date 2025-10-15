import { Injectable, ConflictException } from '@nestjs/common';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from '../repositories/farmer.repository';
import { CreateFarmerDto } from '../dto/create-farmer.dto';

@Injectable()
export class CreateFarmerUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    // Verifica se já existe um agricultor com o mesmo CPF
    const existingFarmer = await this.farmerRepository.findByCpf(createFarmerDto.cpf);
    if (existingFarmer) {
      throw new ConflictException('Já existe um agricultor cadastrado com este CPF');
    }

    // Cria o agricultor usando o model
    const farmer = Farmer.create(
      createFarmerDto.fullName,
      createFarmerDto.cpf,
      createFarmerDto.birthDate ? new Date(createFarmerDto.birthDate) : undefined,
      createFarmerDto.phone,
      createFarmerDto.isActive ?? true,
    );

    // Salva no repositório
    return this.farmerRepository.create(farmer);
  }
}
