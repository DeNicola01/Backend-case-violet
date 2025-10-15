import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmersController } from './farmers.controller';
import { Farmer, FarmerSchema } from './schemas/farmer.schema';
import { MongodbFarmerRepository } from './infrastructure/repositories/mongodb-farmer.repository';
import { FarmerRepository, FARMER_REPOSITORY } from './domain/repositories/farmer.repository';
import { FarmerDomainService } from './domain/services/farmer-domain.service';
import { CreateFarmerUseCase } from './application/use-cases/create-farmer/create-farmer.use-case';
import { FindAllFarmersUseCase } from './application/use-cases/find-all-farmers/find-all-farmers.use-case';
import { FindFarmerByIdUseCase } from './application/use-cases/find-farmer-by-id/find-farmer-by-id.use-case';
import { FindFarmerByCpfUseCase } from './application/use-cases/find-farmer-by-cpf/find-farmer-by-cpf.use-case';
import { UpdateFarmerUseCase } from './application/use-cases/update-farmer/update-farmer.use-case';
import { DeleteFarmerUseCase } from './application/use-cases/delete-farmer/delete-farmer.use-case';
import { ActivateFarmerUseCase } from './application/use-cases/activate-farmer/activate-farmer.use-case';
import { DeactivateFarmerUseCase } from './application/use-cases/deactivate-farmer/deactivate-farmer.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farmer.name, schema: FarmerSchema }]),
  ],
  controllers: [FarmersController],
  providers: [
    // Repository
    {
      provide: FARMER_REPOSITORY,
      useClass: MongodbFarmerRepository,
    },
    // Domain Services
    FarmerDomainService,
    // Use Cases
    CreateFarmerUseCase,
    FindAllFarmersUseCase,
    FindFarmerByIdUseCase,
    FindFarmerByCpfUseCase,
    UpdateFarmerUseCase,
    DeleteFarmerUseCase,
    ActivateFarmerUseCase,
    DeactivateFarmerUseCase,
  ],
  exports: [
    FARMER_REPOSITORY,
    CreateFarmerUseCase,
    FindAllFarmersUseCase,
    FindFarmerByIdUseCase,
    FindFarmerByCpfUseCase,
    UpdateFarmerUseCase,
    DeleteFarmerUseCase,
    ActivateFarmerUseCase,
    DeactivateFarmerUseCase,
  ],
})
export class FarmersModule {}
