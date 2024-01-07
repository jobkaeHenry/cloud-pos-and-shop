import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/getUser.decorator';
import { User } from 'src/user/entities/User.entity';
import { CategoryService } from './category.service';
import {
  CreateCategoryDTO,
  CreateCategoryResponseDTO,
  PatchCategoryRequestDTO,
} from './DTO/category.dto';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';

@UseGuards(AuthGuard())
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  @Serialize(CreateCategoryResponseDTO)
  async getCategory(@GetUser() user: User) {
    return this.categoryService.getCategoryByUserToken(user);
  }

  @Post()
  @Serialize(CreateCategoryResponseDTO)
  async createCategory(
    @GetUser() user: User,
    @Body() { title }: CreateCategoryDTO
  ) {
    return this.categoryService.createCategory({ title }, user);
  }

  @Patch(':id')
  @Serialize(CreateCategoryResponseDTO)
  async patchCategory(
    @Body() { title }: PatchCategoryRequestDTO,
    @Param('id', ParseIntPipe) categoryId: number
  ) {
    return this.categoryService.patchCategory({ title }, categoryId);
  }

  @Delete(':id')
  @Serialize(CreateCategoryResponseDTO)
  async deleteCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
