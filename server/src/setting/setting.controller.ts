import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { GetUser } from 'src/auth/jwt/getUser.decorator';
import { User } from 'src/user/entities/User.entity';
import {
  CreateSettingDTO,
  PatchSettingDTO,
  SettingResponseDTO,
} from './DTO/SettingDTO';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}
  @UseGuards(AuthGuard())
  @Serialize(SettingResponseDTO)
  @Post()
  async PublishWebSite(@GetUser() user: User, @Body() data: CreateSettingDTO) {
    return this.settingService.PublishWebsite(data, user);
  }

  @UseGuards(AuthGuard())
  @Serialize(SettingResponseDTO)
  @Patch()
  async PatchSetting(@GetUser() user: User, @Body() data: PatchSettingDTO) {
    return this.settingService.PatchSetting(data, user);
  }

  @Get(':domainName')
  @Serialize(SettingResponseDTO)
  async GetSettingByDomaninName(@Param('domainName') domainName: string) {
    return this.settingService.getSettingByDomainName(domainName);
  }
}
