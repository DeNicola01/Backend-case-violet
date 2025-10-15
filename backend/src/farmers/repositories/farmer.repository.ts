import { Farmer } from '../models/farmer.model';

export abstract class FarmerRepository {
  abstract create(farmer: Farmer): Promise<Farmer>;
  abstract findAll(): Promise<Farmer[]>;
  abstract findById(id: string): Promise<Farmer | null>;
  abstract findByCpf(cpf: string): Promise<Farmer | null>;
  abstract update(farmer: Farmer): Promise<Farmer>;
  abstract delete(id: string): Promise<void>;
}
