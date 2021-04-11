import {
	Controller,
	Get,
	Post,
	Body,
	Param, Query
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller('user')
export class AuthController {
	constructor (
    private readonly authService: AuthService
	) {}

  @Get(':id')
	find (@Param() { id }):any {
		return this.authService.find(id)
	}
}
