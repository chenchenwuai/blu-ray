import { Body, Controller, Post } from '@nestjs/common'
import { CategoryService } from './category.service'
import { Category } from './category.entity'
import { CreateDto } from './category.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('category')
@Controller('category')
export class CategoryController {
	constructor (private readonly categoryService:CategoryService) {}

  @Post()
  @ApiOperation({ summary: '创建分类' })
	create (@Body() category:CreateDto) {
		return this.categoryService.create(category)
	}
}
