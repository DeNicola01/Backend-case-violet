import { Farmer } from '../entities/farmer.entity';
import { FarmerId } from '../value-objects/farmer-id.vo';

export interface FarmerWriteRepository {
  save(farmer: Farmer): Promise<Farmer>;
  update(farmer: Farmer): Promise<Farmer>;
  delete(id: FarmerId): Promise<void>;
}
