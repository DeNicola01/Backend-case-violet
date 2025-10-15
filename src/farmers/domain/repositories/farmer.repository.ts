import { FarmerReadRepository } from './farmer-read.repository';
import { FarmerWriteRepository } from './farmer-write.repository';

export interface FarmerRepository extends FarmerReadRepository, FarmerWriteRepository {}

export const FARMER_REPOSITORY = 'FARMER_REPOSITORY';
