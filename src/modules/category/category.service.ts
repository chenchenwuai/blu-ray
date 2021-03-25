import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity'
import { CreateDto } from './category.dto'

@Injectable()
export class CategoryService {
	constructor (
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
	) {}

	async create (tag: CreateDto): Promise<Category> {
		const { label, value } = tag
		const existTagLabel = await this.categoryRepository.findOne({ where: { label }})
		if (existTagLabel) {
			throw new HttpException('标签名称已存在', HttpStatus.BAD_REQUEST)
		}

		const existTagValue = await this.categoryRepository.findOne({ where: { value }})
		if (existTagValue) {
			throw new HttpException('标签值已存在', HttpStatus.BAD_REQUEST)
		}

		const newTag = await this.categoryRepository.create(tag)
		await this.categoryRepository.save(newTag)
		return newTag
	}
}
