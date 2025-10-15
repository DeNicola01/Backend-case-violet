import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidCPF } from '../utils/cpf.validator';

export class CreateFarmerDto {
  @ApiProperty({ description: 'Nome completo do agricultor' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'CPF do agricultor (único e válido)' })
  @IsString()
  @IsValidCPF()
  cpf: string;

  @ApiPropertyOptional({ description: 'Data de nascimento do agricultor' })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({ description: 'Telefone do agricultor' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Status ativo do agricultor', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
