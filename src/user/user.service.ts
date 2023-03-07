import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly studentRepository: Repository<User>
  ) {}

  async findAll({ name, age }) {
    const results = await this.studentRepository.find({
      where: {
        name,
        age
      }
    })
    return results ?? 'not found'
  }

  async create(body: any) {
    const user = new User()
    user.name = body.name
    user.age = body.age || ''
    this.studentRepository.save(user)
  }
}
