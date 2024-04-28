import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { User } from 'src/user/entities/User.entity';
import { CreateCategoryDTO, PatchCategoryRequestDTO } from './DTO/category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async getCategoryByUserToken(user: User) {
    const category = await this.repo.find({
      where: { user: { id: user.id } },
      order: { id: 'DESC' },
    });
    return category;
  }

  async createCategory(data: CreateCategoryDTO, user: User) {
    const newCategory = this.repo.create(data);
    newCategory.user = user;
    return this.repo.save(newCategory);
  }
  // FIXME : 유저 체크
  async patchCategory(data: PatchCategoryRequestDTO, id: Category['id']) {
    const category = await this.repo.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('해당하는 카테고리가 없습니다');
    }
    Object.assign(category, { ...data });
    return await this.repo.save(category);
  }

  async deleteCategory(id: Category['id']) {
    const category = await this.repo.findOne({
      where: { id },
      relations: ['menu'],
    });
    return await this.repo.softRemove(category);
  }
}
