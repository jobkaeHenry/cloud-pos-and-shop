import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';
import { UserInfoResponseDTO } from './DTO/userDTO';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/getUser.decorator';
import { User } from './entities/User.entity';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Serialize(UserInfoResponseDTO)
  async getMyInfo(@GetUser() user: User) {
    return await this.userService.getUserInfo(user);
  }

  @Get(':id')
  @Serialize(UserInfoResponseDTO)
  getUserInfoById(@Param('id') id: string) {
    return this.userService.getUserInfoByUserId(Number(id));
  }
}
