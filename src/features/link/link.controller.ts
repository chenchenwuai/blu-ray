import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { LinkService } from './link.service';
import { LinkEntity } from "./link.entity";
import { CreateLinkDto } from './dto/link.dto';

@ApiTags('link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService:LinkService){}

  @ApiParam({name:'id'})
  @Get(':id')
  async findOne(@Param() {id}):Promise<LinkEntity>{
    return await this.linkService.findOne(id)
  }

  @Post()
  async create(@Body() linkData:CreateLinkDto):Promise<any>{
    return await this.linkService.create(linkData)
  }

}
