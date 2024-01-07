import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getConfigToken } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      secretOrKey: getConfigToken('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
