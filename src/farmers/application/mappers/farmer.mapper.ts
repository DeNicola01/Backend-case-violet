import { Farmer } from '../../domain/entities/farmer.entity';
import { FarmerResponseDto } from '../../dto/farmer-response.dto';

export class FarmerMapper {
  /**
   * Converte uma entidade Farmer para FarmerResponseDto
   * @param farmer - Entidade Farmer do domínio
   * @returns FarmerResponseDto - DTO de resposta
   */
  static toResponseDto(farmer: Farmer): FarmerResponseDto {
    return {
      id: farmer.id.getValue(),
      fullName: farmer.name.getValue(),
      cpf: farmer.cpf.getValue(),
      birthDate: farmer.birthDate,
      phone: farmer.phone.getValue(),
      isActive: farmer.isActive,
      createdAt: farmer.createdAt,
      updatedAt: farmer.updatedAt,
    };
  }

  /**
   * Converte um array de entidades Farmer para array de FarmerResponseDto
   * @param farmers - Array de entidades Farmer
   * @returns FarmerResponseDto[] - Array de DTOs de resposta
   */
  static toResponseDtoArray(farmers: Farmer[]): FarmerResponseDto[] {
    return farmers.map(farmer => this.toResponseDto(farmer));
  }
}
