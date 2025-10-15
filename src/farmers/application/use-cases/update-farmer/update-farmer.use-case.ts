import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Farmer } from '../../../domain/entities/farmer.entity';
import { FarmerRepository, FARMER_REPOSITORY } from '../../../domain/repositories/farmer.repository';
import { FarmerFactory, UpdateFarmerData } from '../../../domain/factories/farmer.factory';
import { FarmerId } from '../../../domain/value-objects/farmer-id.vo';

@Injectable()
export class UpdateFarmerUseCase {
  constructor(
    @Inject(FARMER_REPOSITORY)
    private readonly farmerRepository: FarmerRepository,
  ) {}

  /**
   * Atualiza os dados de um agricultor existente
   * @param id - ID do agricultor a ser atualizado
   * @param name - Novo nome (opcional)
   * @param birthDate - Nova data de nascimento (opcional)
   * @param phone - Novo telefone (opcional)
   * @param isActive - Novo status ativo (opcional)
   * @returns Promise<Farmer> - Agricultor atualizado
   * @throws NotFoundException se agricultor não for encontrado
   */
  async execute(
    id: string,
    name?: string,
    birthDate?: string,
    phone?: string,
    isActive?: boolean,
  ): Promise<Farmer> {
    // Buscar agricultor existente
    const farmerId = new FarmerId(id);
    const existingFarmer = await this.farmerRepository.findById(farmerId);
    
    if (!existingFarmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }

    // Atualizar usando factory
    const updateData: UpdateFarmerData = {
      name,
      birthDate,
      phone,
      isActive,
    };

    FarmerFactory.update(existingFarmer, updateData);

    // Salvar no repositório
    const updatedFarmer = await this.farmerRepository.update(existingFarmer);

    // Limpar eventos de domínio após persistência
    updatedFarmer.clearDomainEvents();

    return updatedFarmer;
  }
}
