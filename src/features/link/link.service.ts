import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { Repository, getManager } from 'typeorm';
import { CreateLinkDto } from './dto/link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>
  ) {}

  async findOne(id:number):Promise<LinkEntity>{
    const link = this.linkRepository.findOne(id)
    return link
  }

  async create(linkData:CreateLinkDto):Promise<any>{
    const movie = getManager().findOne('movie',linkData.movieId)
    const link = new LinkEntity()
    link.name = linkData.name
    link.type = linkData.type
    link.uri = linkData.uri
    link.size = linkData.size
    link.quality = linkData.quality
    // link.movie = movie
    return await this.linkRepository.save(link)
  }
}
