import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LocalStorage } from './local.strategy'
import { JwtStorage } from './jwt.strategy'
import { User } from '../user/entities/user.entity'
import { jwtConstants } from './constants'
import { UserService } from 'src/user/user.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, LocalStorage, JwtStorage, UserService],
  exports: [AuthService]
})
export class AuthModule {}
