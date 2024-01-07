import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/Menu.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/User.entity';
import { CreateMenuDTO } from './DTO/CreateMenu.dto';
import { Category } from 'src/category/entities/category.entity';
import { PatchMenuRequestDTO } from './DTO/PatchMenu.dto';
import { Option } from './entities/Option.entity';
import { CreateOptionDTO, PatchOptionDTO } from './DTO/Option.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Option) private optionRepo: Repository<Option>,
    private dataSource: DataSource
  ) {}

  async getMenuByUserId(userId: User['id']) {
    const menuArr = await this.menuRepo.find({
      where: { user: { id: userId } },
      relations: ['category', 'option'],
    });
    // menuArr 내의 각각의 메뉴에 대해 option이 빈 배열인 경우 해당 option을 제거
    const filteredMenuArr = menuArr.map((menu) => ({
      ...menu,
      option: menu.option.length > 0 ? menu.option : undefined,
    }));

    return filteredMenuArr;
  }
  async getMenuByDomainName(domainName: string) {
    const menuArr = await this.menuRepo.find({
      where: { user: { setting: { domainName } } },
      relations: ['category', 'option'],
    });
    const filteredMenuArr = menuArr.map((menu) => ({
      ...menu,
      option: menu.option.length > 0 ? menu.option : undefined,
    }));

    return filteredMenuArr;
  }

  async createMenu({ option, ...data }: CreateMenuDTO, user: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const newMenu = this.menuRepo.create(data);

      const existingCategory = await this.categoryRepo.findOne({
        where: { id: data.categoryId },
      });

      if (!existingCategory) {
        throw new BadRequestException('존재 하지 않는 카테고리 ID 입니다');
      }

      newMenu.user = user;
      newMenu.category = existingCategory;
      await this.menuRepo.save(newMenu);

      if (option) {
        await this.createOptionByArray(option, newMenu.id);
      }

      return newMenu;
    } catch (error) {
      // 에러가 발생하면 롤백n
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 쿼리 러너 해제
      await queryRunner.release();
    }
  }

  async patchMenu({
    categoryId,
    menuId,
    option,
    ...otherUpdateData
  }: PatchMenuRequestDTO & { menuId: number }) {
    const queryRunner = this.dataSource.createQueryRunner();

    const prevMenu = await this.findMenuById(menuId);
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      // 값 업데이트
      Object.assign(prevMenu, otherUpdateData);
      // 카테고리 업데이트
      if (categoryId) {
        const newCategory = await this.categoryRepo.findOne({
          where: { id: categoryId },
        });
        if (!newCategory) {
          throw new NotFoundException('해당하는 카테고리가 없습니다');
        }
        prevMenu.category = newCategory;
      }

      // 옵션업데이트
      if (option) {
        const { remove, patch, create } = option;

        let savePromises = [];

        if (remove) {
          savePromises = [
            ...savePromises,
            ...remove.map((id) => this.deleteOption(id)),
          ];
        }
        if (patch) {
          savePromises = [
            ...savePromises,
            ...patch.map(({ id, title, price }) =>
              this.patchOption({ title, price }, id)
            ),
          ];
        }
        if (create) {
          savePromises = [
            ...savePromises,
            ...create.map((data) => this.createOption(data, menuId)),
          ];
        }
        await Promise.all(savePromises);
      }
      await this.menuRepo.save(prevMenu);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 쿼리 러너 해제
      await queryRunner.release();
    }
  }

  async deleteMenu(menuId: number) {
    const menuToDelete = await this.menuRepo.findOne({
      where: { id: menuId },
      // 넣어줘야 cascade가 작동함
      relations: ['option'],
    });
    await this.menuRepo.softRemove(menuToDelete);
  }

  // 옵션
  async createOption({ title, price }: CreateOptionDTO, menuId: Menu['id']) {
    const existingMenu = await this.findMenuById(menuId);

    const newOption = this.optionRepo.create({ title, price });
    newOption.menu = existingMenu;

    return this.optionRepo.save(newOption);
  }

  async createOptionByArray(option: CreateOptionDTO[], menuId: Menu['id']) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const existingMenu = await this.findMenuById(menuId);

      // Promise 배열을 저장하기 위한 배열
      const savePromises = option.map(({ title, price }) => {
        const newOption = this.optionRepo.create({ title, price });
        newOption.menu = existingMenu;
        return this.optionRepo.save(newOption);
      });

      // 모든 Promise가 완료될 때까지 기다림
      await Promise.all(savePromises);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      // 에러가 발생하면 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 쿼리 러너 해제
      await queryRunner.release();
    }
  }

  async patchOption(updateData: PatchOptionDTO, optionId: Option['id']) {
    const prevOption = await this.findOptionById(optionId);
    Object.assign(prevOption, updateData);

    return this.optionRepo.save(prevOption);
  }

  async deleteOption(optionId: Option['id']) {
    const optionToDelete = await this.findOptionById(optionId);
    await this.optionRepo.softRemove(optionToDelete);
    return 'Completly removed';
  }

  async findMenuById(id: Menu['id']) {
    const existingMenu = await this.menuRepo.findOne({ where: { id } });

    if (!existingMenu) {
      throw new NotFoundException('존재하지 않는 메뉴입니다');
    }
    return existingMenu;
  }

  async findOptionById(id: Option['id']) {
    const existingOption = await this.optionRepo.findOne({ where: { id } });
    if (!existingOption) {
      throw new NotFoundException('존재하지 않는 옵션입니다');
    }
    return existingOption;
  }
}
