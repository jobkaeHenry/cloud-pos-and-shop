import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';

import { GetAllMenuDTO } from './DTO/GetAllMenu.dto';

@Controller('menu')
export class PublicMenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get(':domainName')
  @Serialize(GetAllMenuDTO)
  async getAllMenuByUserId(@Param('domainName') domainName: string) {
    return await this.menuService.getMenuByDomainName(domainName);
  }
}
