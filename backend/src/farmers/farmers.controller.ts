import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateFarmerUseCase } from './application/use-cases/create-farmer/create-farmer.use-case';
import { FindAllFarmersUseCase } from './application/use-cases/find-all-farmers/find-all-farmers.use-case';
import { FindFarmersWithFiltersUseCase } from './application/use-cases/find-farmers-with-filters/find-farmers-with-filters.use-case';
import { FindFarmerByIdUseCase } from './application/use-cases/find-farmer-by-id/find-farmer-by-id.use-case';
import { FindFarmerByCpfUseCase } from './application/use-cases/find-farmer-by-cpf/find-farmer-by-cpf.use-case';
import { UpdateFarmerUseCase } from './application/use-cases/update-farmer/update-farmer.use-case';
import { DeleteFarmerUseCase } from './application/use-cases/delete-farmer/delete-farmer.use-case';
import { ActivateFarmerUseCase } from './application/use-cases/activate-farmer/activate-farmer.use-case';
import { DeactivateFarmerUseCase } from './application/use-cases/deactivate-farmer/deactivate-farmer.use-case';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { FarmerResponseDto } from './dto/farmer-response.dto';
import { FindFarmersDto } from './dto/find-farmers.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { FarmerMapper } from './application/mappers/farmer.mapper';

@ApiTags('farmers')
@Controller('farmers')
export class FarmersController {
  constructor(
    private readonly createFarmerUseCase: CreateFarmerUseCase,
    private readonly findAllFarmersUseCase: FindAllFarmersUseCase,
    private readonly findFarmersWithFiltersUseCase: FindFarmersWithFiltersUseCase,
    private readonly findFarmerByIdUseCase: FindFarmerByIdUseCase,
    private readonly findFarmerByCpfUseCase: FindFarmerByCpfUseCase,
    private readonly updateFarmerUseCase: UpdateFarmerUseCase,
    private readonly deleteFarmerUseCase: DeleteFarmerUseCase,
    private readonly activateFarmerUseCase: ActivateFarmerUseCase,
    private readonly deactivateFarmerUseCase: DeactivateFarmerUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo agricultor' })
  @ApiResponse({
    status: 201,
    description: 'Agricultor criado com sucesso',
    type: FarmerResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou CPF inválido',
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe um agricultor com este CPF',
  })
  @ApiBody({ type: CreateFarmerDto })
  async create(@Body() createFarmerDto: CreateFarmerDto): Promise<FarmerResponseDto> {
    const farmer = await this.createFarmerUseCase.execute(
      createFarmerDto.fullName,
      createFarmerDto.cpf,
      createFarmerDto.birthDate,
      createFarmerDto.phone,
      createFarmerDto.isActive,
    );
    return FarmerMapper.toResponseDto(farmer);
  }

  @Get()
  @ApiOperation({ summary: 'Listar agricultores com filtros e paginação' })
  @ApiQuery({ name: 'name', required: false, description: 'Filtrar por nome' })
  @ApiQuery({ name: 'cpf', required: false, description: 'Filtrar por CPF' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filtrar por status ativo/inativo' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão: 10)' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de agricultores retornada com sucesso',
    type: PaginatedResponseDto<FarmerResponseDto>,
  })
  async findAll(@Query() query: FindFarmersDto): Promise<PaginatedResponseDto<FarmerResponseDto>> {
    const filters = {
      name: query.name,
      cpf: query.cpf,
      isActive: query.isActive,
    };

    const pagination = {
      page: query.page || 1,
      limit: query.limit || 10,
    };

    const result = await this.findFarmersWithFiltersUseCase.execute(filters, pagination);
    
    return {
      data: FarmerMapper.toResponseDtoArray(result.data),
      meta: result.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar agricultor por ID' })
  @ApiParam({ name: 'id', description: 'ID do agricultor' })
  @ApiResponse({
    status: 200,
    description: 'Agricultor encontrado',
    type: FarmerResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Agricultor não encontrado',
  })
  async findOne(@Param('id') id: string): Promise<FarmerResponseDto> {
    const farmer = await this.findFarmerByIdUseCase.execute(id);
    return FarmerMapper.toResponseDto(farmer);
  }

  @Get('cpf/:cpf')
  @ApiOperation({ summary: 'Buscar agricultor por CPF' })
  @ApiParam({ name: 'cpf', description: 'CPF do agricultor' })
  @ApiResponse({
    status: 200,
    description: 'Agricultor encontrado',
    type: FarmerResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Agricultor não encontrado',
  })
  async findByCpf(@Param('cpf') cpf: string): Promise<FarmerResponseDto> {
    const farmer = await this.findFarmerByCpfUseCase.execute(cpf);
    return FarmerMapper.toResponseDto(farmer);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do agricultor' })
  @ApiParam({ name: 'id', description: 'ID do agricultor' })
  @ApiResponse({
    status: 200,
    description: 'Agricultor atualizado com sucesso',
    type: FarmerResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Agricultor não encontrado',
  })
  @ApiBody({ type: UpdateFarmerDto })
  async update(
    @Param('id') id: string,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ): Promise<FarmerResponseDto> {
    const farmer = await this.updateFarmerUseCase.execute(
      id,
      updateFarmerDto.fullName,
      updateFarmerDto.birthDate,
      updateFarmerDto.phone,
      updateFarmerDto.isActive,
    );
    return FarmerMapper.toResponseDto(farmer);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Desativar agricultor' })
  @ApiParam({ name: 'id', description: 'ID do agricultor' })
  @ApiResponse({
    status: 200,
    description: 'Agricultor desativado com sucesso',
    type: FarmerResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Agricultor não encontrado',
  })
  async deactivate(@Param('id') id: string): Promise<FarmerResponseDto> {
    const farmer = await this.deactivateFarmerUseCase.execute(id);
    return FarmerMapper.toResponseDto(farmer);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Ativar agricultor' })
  @ApiParam({ name: 'id', description: 'ID do agricultor' })
  @ApiResponse({
    status: 200,
    description: 'Agricultor ativado com sucesso',
    type: FarmerResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Agricultor não encontrado',
  })
  async activate(@Param('id') id: string): Promise<FarmerResponseDto> {
    const farmer = await this.activateFarmerUseCase.execute(id);
    return FarmerMapper.toResponseDto(farmer);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir agricultor' })
  @ApiParam({ name: 'id', description: 'ID do agricultor' })
  @ApiResponse({
    status: 204,
    description: 'Agricultor excluído com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Não é possível excluir um agricultor ativo',
  })
  @ApiResponse({
    status: 404,
    description: 'Agricultor não encontrado',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteFarmerUseCase.execute(id);
  }
}
