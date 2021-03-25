import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
	) {}

	async find (id:number):Promise<User> {
		const user = this.userRepository.findOne(id)
		return user
	}

	async create (user: Partial<User>):Promise<User> {
		const { account } = user
		const existUser = await this.userRepository.findOne({ where: { account }})
		if (existUser) {
			throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
		}

		const newUser = await this.userRepository.create(user)
		await this.userRepository.save(newUser)
		return newUser
	}
}
