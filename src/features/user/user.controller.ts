import { Controller,Get,Post,Body,Param } from '@nestjs/common';
import {UserService} from './user.service'
import { ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from './dto/user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  find(@Param(){ id }):any{
    return this.usersService.find(id)
  }

  @Post()
  create(@Body() userData:CreateUserDto):any{
    return this.usersService.create(userData)
  }
}
