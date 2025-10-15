import { Inject, Injectable } from '@nestjs/common';
import { Farmer } from '../../../domain/entities/farmer.entity';
import { FarmerRepository, FARMER_REPOSITORY } from '../../../domain/repositories/farmer.repository';
import { FindFarmersFilters, PaginationOptions, PaginatedResult } from '../../../domain/repositories/farmer-read.repository';

@Injectable()
export class FindFarmersWithFiltersUseCase {
  constructor(
    @Inject(FARMER_REPOSITORY)
    private readonly farmerRepository: FarmerRepository,
  ) {}

  /**
   * Busca agricultores com filtros e paginação
   * @param filters - Filtros opcionais (nome, CPF, status)
   * @param pagination - Opções de paginação (página, limite)
   * @returns Promise<PaginatedResult<Farmer>> - Resultado paginado com agricultores
   */
  async execute(
    filters: FindFarmersFilters,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<Farmer>> {
    return this.farmerRepository.findWithFilters(filters, pagination);
  }
}
