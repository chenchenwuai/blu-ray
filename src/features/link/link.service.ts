import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>
  ) {}

  async findOne(id:number):Promise<LinkEntity>{
    const movie = this.linkRepository.findOne(id)
    return movie
  }
}
