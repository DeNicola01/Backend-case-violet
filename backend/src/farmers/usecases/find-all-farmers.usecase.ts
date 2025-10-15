import { Injectable } from '@nestjs/common';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from '../repositories/farmer.repository';

@Injectable()
export class FindAllFarmersUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(): Promise<Farmer[]> {
    return this.farmerRepository.findAll();
  }
}
