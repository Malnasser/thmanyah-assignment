import { Body, Controller, Get, Param, Patch, Query, Post, Delete } from '@nestjs/common';
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
import { UserPaginationDto } from './dto/user-pagination.dto';

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

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'Conflict (User with email already exists).' })
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return super._create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: UserPaginationDto })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<UserPaginationDto> {
    return super._findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Return user by id.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @Query('select') select?: string,
  ): Promise<User | null> {
    return super._findOne(id, select);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto, examples: {
    a: { summary: 'Partial Update', value: { firstName: 'New First Name' } },
    b: { summary: 'Full Update', value: { firstName: 'New First Name', lastName: 'New Last Name', email: 'new@example.com' } }
  } })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateUserDto,
  ): Promise<User | null> {
    return super._update(id, updateProgramDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<User | null> {
    return super._remove(id);
  }
}
