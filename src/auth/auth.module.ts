import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalStorage } from './local.strategy'
import { JwtStorage } from './jwt.strategy'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [AuthService]
})
export class AuthModule {}
