import { Module } from '@nestjs/common';
import { AwsS3Service } from './awsS3.service';
import { AwsS3Controller } from './awsS3.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AwsS3Service],
  controllers: [AwsS3Controller],
  exports: [AwsS3Service],
})
export class AwsS3Module {}
