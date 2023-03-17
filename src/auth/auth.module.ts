import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LocalStorage } from './local.strategy'
import { JwtStorage } from './jwt.strategy'
import { User } from '../user/entities/user.entity'
import { jwtConstants } from './constants'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000000s' }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [AuthService]
})
export class AuthModule {}
