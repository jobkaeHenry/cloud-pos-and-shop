import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { CouponModule } from './coupon/coupon.module';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { SettingModule } from './setting/setting.module';
import { OrderModule } from './order/order.module';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    //link db once, and transfer it as singlethon
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get('DATABASE'),
          host: config.get('DB_HOST'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          port: config.get('DB_PORT'),
          synchronize: config.get('NODE_ENV') === 'developement' ? true : false,
          entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        };
      },
    }),
    UserModule,
    AuthModule,
    MenuModule,
    CouponModule,
    CategoryModule,
    SettingModule,
    OrderModule,
    SseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
