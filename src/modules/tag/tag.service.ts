import { Body, HttpException, HttpStatus, Injectable, Param, Patch } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './tag.entity'
import { CreateDto } from './tag.dto'

@Injectable()
export class TagService {
	constructor (
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
	) {}

	/**
	 * 添加 tag
	 * @param tag
	 */
	async create (tag: CreateDto): Promise<Tag> {
		const { label, value } = tag
		const existTagLabel = await this.tagRepository.findOne({ where: { label }})
		if (existTagLabel) {
			throw new HttpException('标签名称已存在', HttpStatus.BAD_REQUEST)
		}

		const existTagValue = await this.tagRepository.findOne({ where: { value }})
		if (existTagValue) {
			throw new HttpException('标签值已存在', HttpStatus.BAD_REQUEST)
		}

		const newTag = await this.tagRepository.create(tag)
		await this.tagRepository.save(newTag)
		return newTag
	}

	async findAll (queryParams):Promise<Tag[]> {
		const qb = this.tagRepository // 创建查询器
			.createQueryBuilder('tag') // 创建 tag 实体
			.select(['tag.id', 'tag.label', 'tag.value']) // 查询特定字段
			.orderBy('tag.createAt', 'DESC') // 排序
		const data = await qb.getMany()
		return data
	}

	async findById (id):Promise<Tag> {
		return this.tagRepository.findOne(id)
	}

	async updateById (id, tag):Promise<Tag> {
		const oldTag =  await this.tagRepository.findOne(id)
		if (oldTag) {
			const updateTag = this.tagRepository.merge(oldTag, tag)
			return this.tagRepository.save(updateTag)
		} else {
			throw new HttpException('标签不存在', HttpStatus.NOT_FOUND)
		}
	}

	async deleteById (id) {
		const tag = await this.tagRepository.findOne(id)
		if (tag) {
			return this.tagRepository.remove(tag)
		} else {
			throw new HttpException('标签不存在', HttpStatus.NOT_FOUND)
		}
	}
}

