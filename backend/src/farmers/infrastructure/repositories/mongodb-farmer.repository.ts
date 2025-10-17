import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FarmerDocument, FarmerSchema } from '../../schemas/farmer.schema';
import { Farmer } from '../../domain/entities/farmer.entity';
import { FarmerRepository } from '../../domain/repositories/farmer.repository';
import { FarmerId } from '../../domain/value-objects/farmer-id.vo';
import { CPF } from '../../domain/value-objects/cpf.vo';
import { Name } from '../../domain/value-objects/name.vo';
import { Phone } from '../../domain/value-objects/phone.vo';
import { FindFarmersFilters, PaginationOptions, PaginatedResult } from '../../domain/repositories/farmer-read.repository';

@Injectable()
export class MongodbFarmerRepository implements FarmerRepository {
  constructor(
    @InjectModel('Farmer') private farmerModel: Model<FarmerDocument>,
  ) {}

  async save(farmer: Farmer): Promise<Farmer> {
    const farmerData = {
      fullName: farmer.name.getValue(),
      cpf: farmer.cpf.getValue(),
      birthDate: farmer.birthDate,
      phone: farmer.phone.getValue(),
      isActive: farmer.isActive,
    };

    const createdFarmer = new this.farmerModel(farmerData);
    const savedFarmer = await createdFarmer.save();

    return this.toDomainEntity(savedFarmer);
  }

  async update(farmer: Farmer): Promise<Farmer> {
    const updatedFarmer = await this.farmerModel
      .findByIdAndUpdate(
        new Types.ObjectId(farmer.id.getValue()),
        {
          fullName: farmer.name.getValue(),
          birthDate: farmer.birthDate,
          phone: farmer.phone.getValue(),
          isActive: farmer.isActive,
          updatedAt: farmer.updatedAt,
        },
        { new: true }
      )
      .exec();

    if (!updatedFarmer) {
      throw new Error('Farmer not found');
    }

    return this.toDomainEntity(updatedFarmer);
  }

  async delete(id: FarmerId): Promise<void> {
    await this.farmerModel.findByIdAndDelete(new Types.ObjectId(id.getValue())).exec();
  }

  async findById(id: FarmerId): Promise<Farmer | null> {
    const farmer = await this.farmerModel.findById(new Types.ObjectId(id.getValue())).exec();
    return farmer ? this.toDomainEntity(farmer) : null;
  }

  async findByCpf(cpf: CPF): Promise<Farmer | null> {
    const farmer = await this.farmerModel.findOne({ cpf: cpf.getValue() }).exec();
    return farmer ? this.toDomainEntity(farmer) : null;
  }

  async findAll(): Promise<Farmer[]> {
    const farmers = await this.farmerModel.find().exec();
    return farmers.map(farmer => this.toDomainEntity(farmer));
  }

  async findWithFilters(filters: FindFarmersFilters, pagination: PaginationOptions): Promise<PaginatedResult<Farmer>> {
    // Construir query de filtros
    const query: any = {};
    
    if (filters.name) {
      query.fullName = { $regex: filters.name, $options: 'i' };
    }
    
    if (filters.cpf) {
      query.cpf = { $regex: filters.cpf.replace(/\D/g, ''), $options: 'i' };
    }
    
    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    // Calcular skip para paginação
    const skip = (pagination.page - 1) * pagination.limit;

    // Executar query com paginação
    const [farmers, total] = await Promise.all([
      this.farmerModel
        .find(query)
        .skip(skip)
        .limit(pagination.limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.farmerModel.countDocuments(query).exec()
    ]);

    // Calcular metadados da paginação
    const totalPages = Math.ceil(total / pagination.limit);
    const hasPrevious = pagination.page > 1;
    const hasNext = pagination.page < totalPages;

    return {
      data: farmers.map(farmer => this.toDomainEntity(farmer)),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
        hasPrevious,
        hasNext,
      },
    };
  }

  async existsByCpf(cpf: CPF): Promise<boolean> {
    const count = await this.farmerModel.countDocuments({ cpf: cpf.getValue() }).exec();
    return count > 0;
  }

  private toDomainEntity(farmerDoc: FarmerDocument): Farmer {
    return new Farmer(
      new FarmerId(farmerDoc._id.toString()),
      new Name(farmerDoc.fullName),
      new CPF(farmerDoc.cpf),
      farmerDoc.birthDate,
      new Phone(farmerDoc.phone),
      farmerDoc.isActive,
      farmerDoc.createdAt,
      farmerDoc.updatedAt,
    );
  }
}
