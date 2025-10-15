import { Farmer } from '../entities/farmer.entity';
import { FarmerId } from '../value-objects/farmer-id.vo';
import { CPF } from '../value-objects/cpf.vo';

export interface FindFarmersFilters {
  name?: string;
  cpf?: string;
  isActive?: boolean;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export interface FarmerReadRepository {
  findById(id: FarmerId): Promise<Farmer | null>;
  findByCpf(cpf: CPF): Promise<Farmer | null>;
  findAll(): Promise<Farmer[]>;
  findWithFilters(filters: FindFarmersFilters, pagination: PaginationOptions): Promise<PaginatedResult<Farmer>>;
  existsByCpf(cpf: CPF): Promise<boolean>;
}
