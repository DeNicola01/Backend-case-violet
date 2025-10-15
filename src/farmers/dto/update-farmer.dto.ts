import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFarmerDto {
  @ApiPropertyOptional({ 
    description: 'Nome completo do agricultor',
    example: 'João Silva Santos Junior'
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ 
    description: 'Data de nascimento do agricultor',
    example: '1990-05-15'
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({ 
    description: 'Telefone do agricultor',
    example: '(11) 88888-8888'
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ 
    description: 'Status ativo do agricultor',
    example: false
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // CPF não pode ser alterado, então não incluímos aqui
}
