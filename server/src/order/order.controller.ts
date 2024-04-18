import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/getUser.decorator';
import { User } from 'src/user/entities/User.entity';
import { CreateOrderDTO } from './DTO/CreateOrder.dto';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';
import { GetOrderResponseDTO } from './DTO/getOrder.dto';
import { ChangeOrderStatusRequestDTO } from './DTO/patchOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  @UseGuards(AuthGuard())
  @Serialize(GetOrderResponseDTO)
  async getMyShopOrder(@GetUser() user: User) {
    return this.orderService.GetOrderListById(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  @Serialize(GetOrderResponseDTO)
  async CreateOrder(@GetUser() user: User, @Body() data: CreateOrderDTO) {
    return this.orderService.createOrder(user, data);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard())
  @Serialize(GetOrderResponseDTO)
  async ChangeStatus(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) orderId: number,
    @Body() { status }: ChangeOrderStatusRequestDTO
  ) {
    return this.orderService.changeStatus(user, orderId, status);
  }
}
