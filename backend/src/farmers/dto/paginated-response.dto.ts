import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({ description: 'Página atual' })
  page: number;

  @ApiProperty({ description: 'Itens por página' })
  limit: number;

  @ApiProperty({ description: 'Total de itens' })
  total: number;

  @ApiProperty({ description: 'Total de páginas' })
  totalPages: number;

  @ApiProperty({ description: 'Tem página anterior' })
  hasPrevious: boolean;

  @ApiProperty({ description: 'Tem próxima página' })
  hasNext: boolean;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Dados da página atual' })
  data: T[];

  @ApiProperty({ description: 'Metadados da paginação' })
  meta: PaginationMetaDto;
}
