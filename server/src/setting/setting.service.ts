import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entity/Setting.entity';
import { CreateSettingDTO, PatchSettingDTO } from './DTO/SettingDTO';
import { User } from 'src/user/entities/User.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting) private repo: Repository<Setting>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async PublishWebsite(data: CreateSettingDTO, user: User) {
    const newSetting = this.repo.create(data);
    newSetting.user = user;

    return await this.repo.save(newSetting);
  }

  async getSettingByDomainName(domainName: string) {
    const setting = await this.repo.findOne({
      where: { domainName },
      relations: ['user'],
    });
    if (!setting) {
      throw new NotFoundException();
    }
    return setting;
  }

  async PatchSetting(data: PatchSettingDTO, user: User) {
    const prevSetting = await this.repo.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });

    if (!prevSetting) {
      throw new NotFoundException('해당하는 쿠폰이 없습니다');
    }
    Object.assign(prevSetting, { ...data });
    return await this.repo.save(prevSetting);
  }
}
