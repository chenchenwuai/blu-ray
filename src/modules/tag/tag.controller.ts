import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { TagService } from './tag.service'
import { Tag } from './tag.entity'
import { CreateDto } from './tag.dto'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('tag')
@Controller('tag')
export class TagController {
	constructor (private readonly tagService:TagService) {}

	/**
	 * 添加标签
	 * @param tag
	 */
  @Post()
  @ApiOperation({ summary: '创建标签' })
	create (@Body() tag:CreateDto) {
		return this.tagService.create(tag)
	}

	/**
	 * 查询所有tag
	 * @param queryParams
	 */
	@Get()
	@ApiOperation({ summary: '查询所有tag' })
  findAll (@Query() queryParams):Promise<Tag[]> {
  	return this.tagService.findAll(queryParams)
  }

	/**
	 * 根据id获取tag
	 * @param id
	 */
	@Get(':id')
	@ApiParam({ name: 'id', required: true })
	@ApiOperation({ summary: '根据id获取tag' })
	findById (@Param('id') id) {
		return this.tagService.findById(id)
	}

	@Patch(':id')
	@ApiParam({ name: 'id', required: true })
	@ApiOperation({ summary: '更新某个tag' })
	patchById (@Param('id') id, @Body() tag:Partial<CreateDto>) {
		return this.tagService.updateById(id, tag)
	}

	@Put(':id')
	@ApiParam({ name: 'id', required: true })
	@ApiOperation({ summary: '全量更新某个tag' })
	updateById (@Param('id') id, @Body() tag:CreateDto) {
		return this.tagService.updateById(id, tag)
	}

	@Delete(':id')
	@ApiParam({ name: 'id', required: true })
	@ApiOperation({ summary: '删除某个tag' })
	deleteById (@Param('id') id) {
		return this.tagService.deleteById(id)
	}
}
