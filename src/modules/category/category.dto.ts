import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

const className = '分类'
export class CreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: `${className}名称不能为空` })
  @MaxLength(20, { message: `${className}名称长度超过$constraint1位` })
  readonly label:string

  @IsNotEmpty({ message: `${className}值不能为空` })
  @MaxLength(64, { message: `${className}值长度超过$constraint1位` })
  readonly value:string
}
