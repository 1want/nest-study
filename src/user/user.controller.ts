import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common'
// import { Tranasc } from 'typeorm'
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
    return this.userService.findAll()
  }

  @Post('addUser')
  create(@Body() body: UserType) {
    this.userService.create(body)
    return '创建成功'
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
