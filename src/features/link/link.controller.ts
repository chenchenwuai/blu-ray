import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LinkService } from './link.service';
import { LinkEntity } from "./link.entity";

@ApiTags('movie')
@Controller('movie')
export class LinkController {
  constructor(private readonly linkService:LinkService){}

  async findOne(@Param() {id}):Promise<LinkEntity>{
    return await this.linkService.findOne(id)
  }

}
