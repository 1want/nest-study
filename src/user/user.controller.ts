import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  Req
} from '@nestjs/common'
import { UserService } from './user.service'
import { RolesGuard } from './guard/roles.guard'
import { UserType } from './type'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../auth/auth.service'

@Controller('user/')
@UseGuards(RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('myInfo')
  async getUserInfo(@Req() req) {
    return req.user
  }

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
