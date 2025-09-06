import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { BaseController } from '@common/base/base.controller';
import { PaginationQueryDto } from '@common/base/dto/pagination-query.dto';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResDto,
  CategoryPaginationDto,
} from './dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController extends BaseController<Category> {
  constructor(private readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully created.',
    type: CategoryResDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResDto> {
    const entity = new Category();
    Object.assign(entity, createCategoryDto);
    const saved = await super._create(entity);
    return CategoryResDto.fromEntity(saved);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: CategoryPaginationDto })
  @ApiBearerAuth()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<CategoryPaginationDto> {
    const result = await super._findAll(query);
    return CategoryPaginationDto.fromPaginated(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiParam({ name: 'id', type: String, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Return category by id.',
    type: CategoryResDto,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<CategoryResDto | null> {
    const result = await super._findOne(id);
    if (!result) {
      throw new NotFoundException('Category not found');
    }
    return CategoryResDto.fromEntity(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiParam({ name: 'id', type: String, description: 'Category ID' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
    type: CategoryResDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResDto | null> {
    const existingCategory = await this.categoriesService.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }
    const entity = new Category();
    Object.assign(entity, updateCategoryDto);
    const updatedCategory = await super._update(id, entity);
    if (!updatedCategory) {
      throw new NotFoundException('Category not found after update');
    }
    return CategoryResDto.fromEntity(updatedCategory);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiParam({ name: 'id', type: String, description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.',
    type: CategoryResDto,
  })
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<CategoryResDto | null> {
    const existingCategory = await this.categoriesService.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Category Not Found');
    }
    const result = await super._remove(id);
    return CategoryResDto.fromEntity(result);
  }
}
