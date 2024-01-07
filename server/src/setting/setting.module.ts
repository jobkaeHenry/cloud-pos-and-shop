import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entity/Setting.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setting, User]), AuthModule],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
