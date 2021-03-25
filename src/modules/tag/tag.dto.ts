import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

const className = '标签'
export class CreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: `${className}名称不能为空` })
  @MaxLength(20, { message: '名称长度超过$constraint1位' })
  readonly label:string

  @ApiProperty()
  @IsNotEmpty({ message: `${className}值不能为空` })
  @MaxLength(64, { message: '标签值长度超过$constraint1位' })
  readonly value:string
}
