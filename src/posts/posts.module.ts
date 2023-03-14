import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsController } from './posts.controller'
import { Posts } from './entities/post.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
