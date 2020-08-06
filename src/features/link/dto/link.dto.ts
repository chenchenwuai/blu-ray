import { IsNotEmpty, IsIn, IsNumber } from 'class-validator';

export class CreateLinkDto{
  @IsNotEmpty({message: '链接名称不能为空'})
  name:string

  @IsNotEmpty({message: '链接类型不能为空'})
  @IsIn(['magnet','bt','direct'],{message:"链接类型错误"})
  type:string

  @IsNotEmpty({message: '链接不能为空'})
  uri:string

  @IsNotEmpty({message: '文件大小不能为空'})
  size:string

  @IsNotEmpty({message: '清晰度不能为空'})
  quality:string

  @IsNotEmpty({message: '没有关联的电影'})
  @IsNumber({},{message:'无效的电影id'})
  movieId:number
}