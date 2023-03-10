import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { User } from './entities/user.entity'
import { UserType } from './type'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>
  ) {}

  async findAll({ username }: UserType) {
    const results = await this.user.find({
      where: {
        username: Like(`%${username}%`)
      }
    })
    return results ?? 'not found'
  }

  async create(body: any) {
    const user = this.user.create(body)
    this.user.save(user)
  }

  async update(id, body: any) {
    this.user.update(id, body)
  }

  async delete(id: number[]) {
    this.user.delete(id)
  }

  async register(createUser) {
    const { username } = createUser

    const existUser = await this.user.findOne({
      where: { username }
    })
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }

    const user = await this.user.create(createUser)
    await this.user.save(user)
    return this.user.findOne({
      where: { username }
    })
  }
}
