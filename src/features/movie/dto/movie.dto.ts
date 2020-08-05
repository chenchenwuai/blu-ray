import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto{
  @IsNotEmpty()
  readonly name:string

  readonly translation_name:string
  readonly place:string
  readonly language:string

  @IsNotEmpty()
  readonly release_date:string

  readonly time_length:string

  readonly links :any[]
}