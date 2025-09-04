import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { BaseController } from '../common/base/base.controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/base/dto/pagination-query.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    return super._findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiResponse({
    status: 200,
    description: 'Return user by id.',
    type: User,
  })
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @Query('select') select?: string,
  ): Promise<User | null> {
    return super._findOne(id, select);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update program' })
  @ApiParam({ name: 'id', type: String, description: 'Program ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The program has been successfully updated.',
    type: User,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateUserDto,
  ): Promise<User | null> {
    return super._update(id, updateProgramDto);
  }
}
