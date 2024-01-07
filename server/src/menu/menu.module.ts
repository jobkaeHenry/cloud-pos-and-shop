import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PublicMenuController } from './PublicMenu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/Menu.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from 'src/category/entities/category.entity';
import { Option } from './entities/Option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Category, Option]), AuthModule],
  providers: [MenuService],
  controllers: [MenuController, PublicMenuController],
})
export class MenuModule {}
