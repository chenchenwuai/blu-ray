import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  
  @IsNotEmpty()
  readonly account: string
  @IsNotEmpty()
  readonly password: string
  @IsNotEmpty()
  readonly nickname: string

  readonly phone: string
  readonly email: string
}