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

  async findOne({ username }) {
    const results = await this.user.findOne({
      where: { username }
    })
    return results ?? 'not found'
  }

  async findAll({ username }: UserType) {
    const results = await this.user.find({
      where: {
        username: Like(`%${username}%`)
      }
    })
    return results ?? 'not found'
  }

  async create(body: any) {
    const { username } = body

    const existUser = await this.user.findOne({
      where: { username }
    })
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }

    const user = await this.user.create(body)
    await this.user.save(user)
    return this.user.findOne({
      where: { username }
    })
  }

  async update(id, body: any) {
    this.user.update(id, body)
  }

  async delete(id: number[]) {
    this.user.delete(id)
  }
}
