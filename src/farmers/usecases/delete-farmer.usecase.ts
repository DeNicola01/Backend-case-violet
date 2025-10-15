import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from '../repositories/farmer.repository';

@Injectable()
export class DeleteFarmerUseCase {
  constructor(private readonly farmerRepository: FarmerRepository) {}

  async execute(id: string): Promise<void> {
    // Busca o agricultor existente
    const farmer = await this.farmerRepository.findById(id);
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }

    // Verifica se pode ser excluído
    if (!farmer.canBeDeleted()) {
      throw new BadRequestException('Não é possível excluir um agricultor ativo. Desative primeiro o agricultor.');
    }

    // Exclui do repositório
    await this.farmerRepository.delete(id);
  }
}
