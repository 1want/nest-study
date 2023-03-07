import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpCode
} from '@nestjs/common'
import { UserService } from './user.service'
import { RolesGuard } from './guard/roles.guard'

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: any) {
    this.userService.create(body)
    return '创建成功'
  }

  @Post('/getList')
  @HttpCode(200)
  findAll(@Body() body: any) {
    return this.userService.findAll(body)
  }
}
