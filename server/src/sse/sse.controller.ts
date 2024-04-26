import {
  Controller,
  Param,
  ParseIntPipe,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { SseService } from './sse.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/getUser.decorator';
import { User } from 'src/user/entities/User.entity';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';
import { GetStreamedOrderResponseDTO } from 'src/order/DTO/getOrder.dto';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}
  @Sse(':shopId')
  @UseGuards(AuthGuard())
  @Serialize(GetStreamedOrderResponseDTO)
  async subscribeNewOrder(
    @Param('shopId', ParseIntPipe) shopId: number,
    @GetUser() user: User
  ) {
    return this.sseService.subscribeNewOrder(shopId, user);
  }
}
