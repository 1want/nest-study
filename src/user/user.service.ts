import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Posts } from 'src/posts/entities/post.entity'
import { Repository, Like, DataSource } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Posts) private posts: Repository<Posts>,
    private dataSource: DataSource
  ) {}

  async findOne({ username }) {
    const results = await this.user.findOne({
      where: {
        username: Like(`%${username}%`)
      }
    })
    return results ?? 'not found'
  }

  async findAll() {
    const results = await this.user
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'posts')
      .getMany()

    return results ?? 'not found'
  }

  async create(body: any) {
    const { username, hobby, password, phone } = body

    const existUser = await this.user.findOne({
      where: { username }
    })
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }

    const posts = new Posts()
    posts.hobby = hobby

    await this.posts.save(posts)
    const user = new User()
    user.username = username
    user.password = password
    user.phone = phone

    user.posts = posts
    // const user = await this.user.create(body)
    // user.posts = posts
    await this.user.save(user)
  }

  async update(id, body: any) {
    this.user.update(id, body)
  }

  async delete(id: number[]) {
    this.user.delete(id)
  }
}
