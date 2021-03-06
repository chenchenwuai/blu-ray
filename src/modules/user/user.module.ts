import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User } from './user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	exports: [UserService],
	providers: [UserService]
})
export class UserModule {}
