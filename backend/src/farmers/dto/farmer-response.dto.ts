import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FarmerResponseDto {
  @ApiProperty({ description: 'ID único do agricultor' })
  id: string;

  @ApiProperty({ description: 'Nome completo do agricultor' })
  fullName: string;

  @ApiProperty({ description: 'CPF do agricultor' })
  cpf: string;

  @ApiPropertyOptional({ description: 'Data de nascimento do agricultor' })
  birthDate?: Date;

  @ApiPropertyOptional({ description: 'Telefone do agricultor' })
  phone?: string;

  @ApiProperty({ description: 'Status ativo do agricultor' })
  isActive: boolean;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de última atualização' })
  updatedAt: Date;
}
