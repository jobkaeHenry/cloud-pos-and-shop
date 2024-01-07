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
import { MenuService } from './menu.service';
import { CreateMenuDTO, GetSingleMenuDTO } from './DTO/CreateMenu.dto';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/getUser.decorator';
import { User } from 'src/user/entities/User.entity';
import { PatchMenuRequestDTO } from './DTO/PatchMenu.dto';
import {
  CreateOptionDTO,
  OptionResponseDTO,
  PatchOptionDTO,
} from './DTO/Option.dto';
import { GetAllMenuDTO } from './DTO/GetAllMenu.dto';

@UseGuards(AuthGuard())
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @Serialize(GetAllMenuDTO)
  async getAllMenuByUserId(@GetUser() user: User) {
    return await this.menuService.getMenuByUserId(user.id);
  }

  @Post()
  @Serialize(GetSingleMenuDTO)
  async createMenu(@GetUser() user: User, @Body() data: CreateMenuDTO) {
    return this.menuService.createMenu(data, user);
  }

  @Patch(':id')
  async patchMenu(
    @Param('id', ParseIntPipe) menuId: number,
    @Body() updateData: PatchMenuRequestDTO
  ) {
    return this.menuService.patchMenu({ menuId, ...updateData });
  }

  @Delete(':id')
  async deleteMenu(@Param('id', ParseIntPipe) menuId: number) {
    return this.menuService.deleteMenu(menuId);
  }

  // 옵션
  @Post(':id/option')
  @Serialize(OptionResponseDTO)
  async addOption(
    @Param('id', ParseIntPipe) menuId: number,
    @Body() { title, price }: CreateOptionDTO
  ) {
    return this.menuService.createOption({ title, price }, menuId);
  }

  @Patch('option/:id')
  @Serialize(OptionResponseDTO)
  async patchOption(
    @Param('id', ParseIntPipe) optionId: number,
    @Body() { title, price }: PatchOptionDTO
  ) {
    return this.menuService.patchOption({ title, price }, optionId);
  }

  @Delete('option/:id')
  async deleteOption(@Param('id', ParseIntPipe) optionId: number) {
    return this.menuService.deleteOption(optionId);
  }
}
