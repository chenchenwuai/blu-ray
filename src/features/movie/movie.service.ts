import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { Repository, getManager } from 'typeorm';
import { CreateMovieDto } from './dto/movie.dto';
import { LinkEntity } from '../link/link.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ) {}

  async findOne(id:number):Promise<MovieEntity>{
    const movie = this.movieRepository.findOne(id)
    return movie
  }

  async create(movieData:CreateMovieDto):Promise<any>{
    const movie = new MovieEntity()
    movie.name = movieData.name
    movie.translation_name = movieData.translation_name
    movie.place = movieData.place
    movie.language = movieData.language
    movie.release_date = movieData.release_date
    movie.time_length = movieData.time_length
    await this.movieRepository.save(movie)

    const links = movieData.links
    if(links && links.length > 0){
      const entityManager = getManager();
      links.every(item=>{
        const link = new LinkEntity()
        link.name = item.name
        link.type = item.type
        link.uri = item.uri
        link.size = item.size
        link.quality = item.quality
        link.movie = movie

        entityManager.save(link)
      })
    }
  }
}
