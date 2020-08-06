import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieEntity } from "./movie.entity";
import { CreateMovieDto } from './dto/movie.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService:MovieService){}

  @ApiQuery({name:'id'})
  @Get(':id')
  async findOne(@Param('id') id:number):Promise<MovieEntity>{
    return await this.movieService.findOne(id)
  }

  @Post()
  async create(@Body() movieData:CreateMovieDto):Promise<any>{
    return await this.movieService.create(movieData)
  }

}


