import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FarmerRepository, FARMER_REPOSITORY } from '../../../domain/repositories/farmer.repository';
import { FarmerDomainService } from '../../../domain/services/farmer-domain.service';
import { FarmerId } from '../../../domain/value-objects/farmer-id.vo';

@Injectable()
export class DeleteFarmerUseCase {
  constructor(
    @Inject(FARMER_REPOSITORY)
    private readonly farmerRepository: FarmerRepository,
    private readonly farmerDomainService: FarmerDomainService,
  ) {}

  /**
   * Exclui um agricultor do sistema
   * @param id - ID do agricultor a ser excluído
   * @returns Promise<void>
   * @throws NotFoundException se agricultor não for encontrado
   * @throws BadRequestException se agricultor estiver ativo
   */
  async execute(id: string): Promise<void> {
    // Buscar agricultor existente
    const farmerId = new FarmerId(id);
    const farmer = await this.farmerRepository.findById(farmerId);
    
    if (!farmer) {
      throw new NotFoundException('Agricultor não encontrado');
    }

    // Validar se pode ser excluído usando serviço de domínio
    this.farmerDomainService.validateFarmerForDeletion(farmer);

    // Excluir do repositório
    await this.farmerRepository.delete(farmerId);
  }
}
