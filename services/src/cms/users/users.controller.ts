import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { BaseController } from '@cms/common/base/base.controller';
import { User } from './entities';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '@cms/common/base/dto/pagination-query.dto';
import { UpdateUserDto, UserPaginationDto, UserResDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController extends BaseController<User> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: UserPaginationDto })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<UserPaginationDto> {
    const result = await super._findAll(query);
    return UserPaginationDto.fromPaginated(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiQuery({
    name: 'select',
    type: String,
    required: false,
    description: 'Comma separated fields to select',
  })
  @ApiResponse({
    status: 200,
    description: 'Return user by id.',
    type: UserResDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @Query('select') select?: string,
  ): Promise<UserResDto | null> {
    const result = await super._findOne(id, select);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return UserResDto.fromEntity(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      a: { summary: 'Partial Update', value: { firstName: 'New First Name' } },
      b: {
        summary: 'Full Update',
        value: {
          firstName: 'New First Name',
          lastName: 'New Last Name',
          email: 'new@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserResDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateUserDto,
  ): Promise<UserResDto | null> {
    const existingUser = await this.userService.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const entity = new User();
    Object.assign(entity, updateProgramDto);
    const updatedUser = await super._update(id, entity);
    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }
    return UserResDto.fromEntity(updatedUser);
  }
}
