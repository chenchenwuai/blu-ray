import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto{
  @IsNotEmpty({message: '电影名称不能为空'})
  name:string

  translation_name?:string
  place?:string
  language?:string
  release_date?:string
  time_length?:string
  director?:string
  writer?:string
  starring?:string
  category?:string
  links? :any[]
}