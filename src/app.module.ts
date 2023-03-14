import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { PostsController } from './posts/posts.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'yizhanlichou9932',
      database: 'tssql',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    AuthModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
