import {
  Controller,
  Get,
  Query,
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Program } from './entities/program.entity';
import { BaseController } from '../common/base/base.controller';
import { PaginationQueryDto } from '../common/base/dto/pagination-query.dto';

@ApiTags('Programs')
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
  @ApiBearerAuth()
  async create(@Body() createProgramDto: CreateProgramDto): Promise<Program> {
    return super.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<{ data: Program[]; total: number; page: number; limit: number }> {
    return super.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    description: 'Return program by id.',
    type: Program,
  })
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @Query('select') select?: string,
  ): Promise<Program | null> {
    return super.findOne(id, select);
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<boolean> {
    return super.remove(id);
  }
}
