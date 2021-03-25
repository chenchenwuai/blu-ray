import {
	Controller,
	Get,
	Post,
	Body,
	Param, Query
} from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor (
    private readonly usersService: UserService
	) {}

  @Get(':id')
	find (@Param() { id }):any {
		return this.usersService.find(id)
	}
}
