import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FarmerDocument, FarmerSchema } from '../schemas/farmer.schema';
import { Farmer } from '../models/farmer.model';
import { FarmerRepository } from './farmer.repository';

@Injectable()
export class MongodbFarmerRepository implements FarmerRepository {
  constructor(
    @InjectModel('Farmer') private farmerModel: Model<FarmerDocument>,
  ) {}

  async create(farmer: Farmer): Promise<Farmer> {
    const farmerData = {
      fullName: farmer.fullName,
      cpf: farmer.cpf,
      birthDate: farmer.birthDate,
      phone: farmer.phone,
      isActive: farmer.isActive,
    };

    const createdFarmer = new this.farmerModel(farmerData);
    const savedFarmer = await createdFarmer.save();

    return this.toDomainModel(savedFarmer);
  }

  async findAll(): Promise<Farmer[]> {
    const farmers = await this.farmerModel.find().exec();
    return farmers.map(farmer => this.toDomainModel(farmer));
  }

  async findById(id: string): Promise<Farmer | null> {
    const farmer = await this.farmerModel.findById(id).exec();
    return farmer ? this.toDomainModel(farmer) : null;
  }

  async findByCpf(cpf: string): Promise<Farmer | null> {
    const farmer = await this.farmerModel.findOne({ cpf }).exec();
    return farmer ? this.toDomainModel(farmer) : null;
  }

  async update(farmer: Farmer): Promise<Farmer> {
    const updatedFarmer = await this.farmerModel
      .findByIdAndUpdate(
        farmer.id,
        {
          fullName: farmer.fullName,
          birthDate: farmer.birthDate,
          phone: farmer.phone,
          isActive: farmer.isActive,
          updatedAt: farmer.updatedAt,
        },
        { new: true }
      )
      .exec();

    if (!updatedFarmer) {
      throw new Error('Farmer not found');
    }

    return this.toDomainModel(updatedFarmer);
  }

  async delete(id: string): Promise<void> {
    await this.farmerModel.findByIdAndDelete(id).exec();
  }

  private toDomainModel(farmerDoc: FarmerDocument): Farmer {
    return new Farmer(
      farmerDoc._id.toString(),
      farmerDoc.fullName,
      farmerDoc.cpf,
      farmerDoc.birthDate,
      farmerDoc.phone,
      farmerDoc.isActive,
      farmerDoc.createdAt,
      farmerDoc.updatedAt,
    );
  }
}
