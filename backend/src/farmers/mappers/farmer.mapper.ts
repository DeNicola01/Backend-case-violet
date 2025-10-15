import { Farmer } from '../models/farmer.model';
import { FarmerResponseDto } from '../dto/farmer-response.dto';

export class FarmerMapper {
  static toResponseDto(farmer: Farmer): FarmerResponseDto {
    return {
      id: farmer.id,
      fullName: farmer.fullName,
      cpf: farmer.cpf,
      birthDate: farmer.birthDate,
      phone: farmer.phone,
      isActive: farmer.isActive,
      createdAt: farmer.createdAt,
      updatedAt: farmer.updatedAt,
    };
  }

  static toResponseDtoArray(farmers: Farmer[]): FarmerResponseDto[] {
    return farmers.map(farmer => this.toResponseDto(farmer));
  }
}
