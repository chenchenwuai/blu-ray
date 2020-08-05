import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieEntity } from "./movie.entity";

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService:MovieService){}

  async findOne(@Param() {id}):Promise<MovieEntity>{
    return await this.movieService.findOne(id)
  }

  

}
