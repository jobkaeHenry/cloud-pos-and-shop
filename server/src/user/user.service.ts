import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async getUserInfo(user: User) {
    const existingUser = await this.repo.findOne({
      where: { id: user.id },
      relations: ['setting'],
    });
    return existingUser;
  }
  async getUserInfoByUserId(userId: User['id']) {
    const user = await this.repo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
