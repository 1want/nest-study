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
import { UserType } from './type'

@Controller('user/')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('getUser')
  @HttpCode(200)
  findAll(@Body() body: UserType) {
    return this.userService.findAll(body)
  }

  @Post('addUser')
  create(@Body() body: UserType) {
    return this.userService.create(body)
  }

  @Post('updateUser')
  update(@Body() body: UserType) {
    this.userService.update(body.id, body)
    return '编辑成功'
  }

  @Post('deleteUser')
  delete(@Body('id') id: number[]) {
    this.userService.delete(id)
    return '删除成功'
  }
}
