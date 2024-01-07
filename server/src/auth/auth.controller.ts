import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { RequestLoginDTO, RequestSignUpDTO } from './DTO/authDTOs';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';
import { UserInfoResponseDTO } from 'src/user/DTO/userDTO';
import { GetUser } from './jwt/getUser.decorator';
import { User } from 'src/user/entities/User.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Serialize(UserInfoResponseDTO)
  @HttpCode(201)
  signup(@Body() body: RequestSignUpDTO) {
    return this.authService.signup(body);
  }

  @Post('login')
  login(@Body() body: RequestLoginDTO) {
    return this.authService.login(body);
  }
  @UseGuards(AuthGuard())
  @Post('doubleCheck')
  @Serialize(UserInfoResponseDTO)
  doubleCheck(@GetUser() user: User, @Body() body: RequestLoginDTO) {
    return this.authService.doubleCheck(user.userId, body);
  }
}
