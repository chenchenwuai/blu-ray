import { Controller,Get,Post,Body,Param } from '@nestjs/common';
import {UserService} from './user.service'

import { CreateUserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  find(@Param(){ id }){
    return this.usersService.find(id)
  }

  @Post()
  async create(@Body() userData:CreateUserDto){
    return this.usersService.create(userData)
  }
}
