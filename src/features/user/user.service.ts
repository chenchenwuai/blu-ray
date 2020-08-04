import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "./user.entity";
import { CreateUserDto } from './dto/user.dto';

import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async find(id:number):Promise<UserEntity>{
    const user = this.userRepository.findOne(id)
    return user
  }

  async create(dto:CreateUserDto){
    const newUser = new UserEntity()
    newUser.account = dto.account
    newUser.password = dto.password
    newUser.nickname = dto.nickname
    newUser.phone = dto.phone
    newUser.email = dto.email

    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }
}
