import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalStorage } from './local.strategy'
import { JwtStorage } from './jwt.strategy'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
// import { UserService } from 'src/user/user.service'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
