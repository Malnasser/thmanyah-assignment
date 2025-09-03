import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Program } from './entities/program.entity';
import { BaseController } from '../../shared/database/base-controller.abstract';

@ApiTags('programs')
@Controller('programs')
export class ProgramsController extends BaseController<
  Program,
  CreateProgramDto,
  UpdateProgramDto
> {
  constructor(private readonly programsService: ProgramsService) {
    super(programsService);
  }

  @Post()
  @ApiOperation({ summary: 'Create program' })
  @ApiBody({ type: CreateProgramDto })
  @ApiResponse({
    status: 201,
    description: 'The program has been successfully created.',
    type: Program,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createProgramDto: CreateProgramDto): Promise<Program> {
    return super.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({
    status: 200,
    description: 'Return all programs.',
    type: [Program],
  })
  async findAll(): Promise<Program[]> {
    return super.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    description: 'Return program by id.',
    type: Program,
  })
  async findOne(@Param('id') id: string): Promise<Program | null> {
    return super.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update program' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiBody({ type: UpdateProgramDto })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully updated.',
    type: Program,
  })
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Promise<Program | null> {
    return super.update(id, updateProgramDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete program' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return super.remove(id);
  }
}
