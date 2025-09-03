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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Program } from './entities/program.entity';

@ApiTags('programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @ApiOperation({ summary: 'Create program' })
  @ApiResponse({
    status: 201,
    description: 'The program has been successfully created.',
    type: Program,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({
    status: 200,
    description: 'Return all programs.',
    type: [Program],
  })
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  @ApiResponse({
    status: 200,
    description: 'Return program by id.',
    type: Program,
  })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update program' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully updated.',
    type: Program,
  })
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programsService.update(+id, updateProgramDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete program' })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return id; // this.programsService.remove(+id);
  }
}
