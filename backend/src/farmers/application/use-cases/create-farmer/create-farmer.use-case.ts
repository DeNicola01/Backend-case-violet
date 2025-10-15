import { Inject, Injectable } from '@nestjs/common';
import { Farmer } from '../../../domain/entities/farmer.entity';
import { FarmerRepository, FARMER_REPOSITORY } from '../../../domain/repositories/farmer.repository';
import { FarmerDomainService } from '../../../domain/services/farmer-domain.service';
import { FarmerFactory, CreateFarmerData } from '../../../domain/factories/farmer.factory';
import { CPF } from '../../../domain/value-objects/cpf.vo';

@Injectable()
export class CreateFarmerUseCase {
  constructor(
    @Inject(FARMER_REPOSITORY)
    private readonly farmerRepository: FarmerRepository,
    private readonly farmerDomainService: FarmerDomainService,
  ) {}

  /**
   * Cria um novo agricultor no sistema
   * @param name - Nome completo do agricultor
   * @param cpf - CPF único e válido do agricultor
   * @param birthDate - Data de nascimento (opcional)
   * @param phone - Telefone do agricultor (opcional)
   * @param isActive - Status ativo do agricultor (default: true)
   * @returns Promise<Farmer> - Agricultor criado
   * @throws Error se CPF já existir ou for inválido
   */
  async execute(
    name: string,
    cpf: string,
    birthDate?: string,
    phone?: string,
    isActive: boolean = true,
  ): Promise<Farmer> {
    // Criar value objects
    const cpfVO = new CPF(cpf);
    
    // Verificar se CPF é único
    await this.farmerDomainService.ensureCpfIsUnique(cpfVO);

    // Criar agricultor usando factory
    const farmerData: CreateFarmerData = {
      name,
      cpf,
      birthDate,
      phone,
      isActive,
    };

    const farmer = FarmerFactory.create(farmerData);

    // Salvar no repositório
    const savedFarmer = await this.farmerRepository.save(farmer);

    // Limpar eventos de domínio após persistência
    savedFarmer.clearDomainEvents();

    return savedFarmer;
  }
}
