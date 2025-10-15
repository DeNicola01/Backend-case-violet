import { Farmer } from '../entities/farmer.entity';
import { FarmerId } from '../value-objects/farmer-id.vo';
import { CPF } from '../value-objects/cpf.vo';

export interface FarmerReadRepository {
  findById(id: FarmerId): Promise<Farmer | null>;
  findByCpf(cpf: CPF): Promise<Farmer | null>;
  findAll(): Promise<Farmer[]>;
  existsByCpf(cpf: CPF): Promise<boolean>;
}
