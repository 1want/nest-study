import { Injectable } from '@nestjs/common'
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

  async findAll({ name, age }: UserType) {
    const results = await this.user.find({
      where: {
        name: Like(`%${name}%`),
        age: Like(`%${age}%`)
      }
    })
    return results ?? 'not found'
  }

  async create(body: any) {
    const user = new User()
    user.name = body.name
    user.age = body.age || ''
    this.user.save(user)
  }

  async delete(id: number) {
    this.user.delete(id)
  }
}
