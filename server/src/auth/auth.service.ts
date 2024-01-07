import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/User.entity';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { RequestLoginDTO, RequestSignUpDTO } from './DTO/authDTOs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt/jwt.Interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signup({ userId, password, shopName }: RequestSignUpDTO) {
    const existingUser = await this.repo.findOne({ where: { userId } });
    //If userId already exists, throw conflict exception
    if (existingUser) {
      throw new HttpException(
        `${userId} is already exist`,
        HttpStatus.BAD_REQUEST
      );
    }
    //else, create user with status code 201 and return nothing
    if (!existingUser) {
      const hashedPassword = await this.hashPassword(password);

      const newUser = this.repo.create({
        userId,
        password: hashedPassword,
        shopName,
      });

      return await this.repo.save(newUser);
    }
  }

  async login({ userId, password }: RequestLoginDTO) {
    const user = await this.findOneByUserId(userId);

    const isMatch = await this.comparePassword(password, user.password);

    if (user.userId === userId && isMatch) {
      const payload: JwtPayloadInterface = { id: user.id };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else throw new UnauthorizedException();
  }

  async doubleCheck(
    userIdExtractedFromToken: User['userId'],
    { userId, password }: RequestLoginDTO
  ) {
    if (userIdExtractedFromToken !== userId) {
      throw new UnauthorizedException('토큰과 유저가 일치하지 않습니다');
    }
    const user = await this.findOneByUserId(userId);
    const isValid = this.comparePassword(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('토큰과 유저가 일치하지 않습니다');
    }
    return user;
  }

  // Utils (?)
  async findOneByUserId(userId: RequestLoginDTO['userId']) {
    const user = await this.repo.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException(
        `존재하지 않는 User입니다 userId - ${userId}`
      );
    }
    return user;
  }

  async hashPassword(password: string) {
    return await hash(password, 11);
  }
  async comparePassword(password: string, passwordToBeCompare: string) {
    return await compare(password, passwordToBeCompare);
  }
}
