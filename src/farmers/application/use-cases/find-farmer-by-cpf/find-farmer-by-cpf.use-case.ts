import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Farmer } from '../../../domain/entities/farmer.entity';
import { FarmerRepository, FARMER_REPOSITORY } from '../../../domain/repositories/farmer.repository';
import { CPF } from '../../../domain/value-objects/cpf.vo';

@Injectable()
export class FindFarmerByCpfUseCase {
  constructor(
    @Inject(FARMER_REPOSITORY)
    private readonly farmerRepository: FarmerRepository,
  ) {}

  /**
   * Busca um agricultor pelo CPF
   * @param cpf - CPF do agricultor
   * @returns Promise<Farmer> - Agricultor encontrado
   * @throws NotFoundException se agricultor não for encontrado
   */
  async execute(cpf: string): Promise<Farmer> {
    const cpfVO = new CPF(cpf);
    const farmer = await this.farmerRepository.findByCpf(cpfVO);
    
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado com este CPF');
    }

    return farmer;
  }
}
