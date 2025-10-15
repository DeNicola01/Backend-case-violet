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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateFarmerUseCase } from './application/use-cases/create-farmer/create-farmer.use-case';
import { FindAllFarmersUseCase } from './application/use-cases/find-all-farmers/find-all-farmers.use-case';
import { FindFarmerByIdUseCase } from './application/use-cases/find-farmer-by-id/find-farmer-by-id.use-case';
import { FindFarmerByCpfUseCase } from './application/use-cases/find-farmer-by-cpf/find-farmer-by-cpf.use-case';
import { UpdateFarmerUseCase } from './application/use-cases/update-farmer/update-farmer.use-case';
import { DeleteFarmerUseCase } from './application/use-cases/delete-farmer/delete-farmer.use-case';
import { ActivateFarmerUseCase } from './application/use-cases/activate-farmer/activate-farmer.use-case';
import { DeactivateFarmerUseCase } from './application/use-cases/deactivate-farmer/deactivate-farmer.use-case';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { FarmerResponseDto } from './dto/farmer-response.dto';
import { FarmerMapper } from './application/mappers/farmer.mapper';

@ApiTags('farmers')
@Controller('farmers')
export class FarmersController {
  constructor(
    private readonly createFarmerUseCase: CreateFarmerUseCase,
    private readonly findAllFarmersUseCase: FindAllFarmersUseCase,
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
  @ApiOperation({ summary: 'Listar todos os agricultores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de agricultores retornada com sucesso',
    type: [FarmerResponseDto],
  })
  async findAll(): Promise<FarmerResponseDto[]> {
    const farmers = await this.findAllFarmersUseCase.execute();
    return FarmerMapper.toResponseDtoArray(farmers);
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
