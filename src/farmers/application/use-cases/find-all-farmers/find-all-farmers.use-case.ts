import { Inject, Injectable } from '@nestjs/common';
import { Farmer } from '../../../domain/entities/farmer.entity';
import { FarmerRepository, FARMER_REPOSITORY } from '../../../domain/repositories/farmer.repository';

@Injectable()
export class FindAllFarmersUseCase {
  constructor(
    @Inject(FARMER_REPOSITORY)
    private readonly farmerRepository: FarmerRepository,
  ) {}

  /**
   * Lista todos os agricultores cadastrados
   * @returns Promise<Farmer[]> - Lista de agricultores
   */
  async execute(): Promise<Farmer[]> {
    return this.farmerRepository.findAll();
  }
}
