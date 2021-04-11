import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { UserModule } from '../user/user.module'

const passModule = PassportModule.register({ defaultStrategy: 'jwt' })
const jwtModule = JwtModule.register({
	secret: 'blu-ray',
	signOptions: { expiresIn: '4h' }
})

@Module({
	imports: [UserModule, passModule, jwtModule],
	controllers: [AuthController],
	exports: [passModule, jwtModule],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
