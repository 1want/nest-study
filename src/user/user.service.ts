import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly studentRepository: Repository<User>
  ) {}

  async findAll() {
    const results = await this.studentRepository.find()
    return results ?? 'not found'
  }

  async create(body: any) {
    const user = new User()
    user.name = body.name
    user.age = body.age || ''
    this.studentRepository.save(user)
  }
}
