import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToMany } from 'typeorm'
import { LinkEntity } from '../link/link.entity'

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
    nullable:false,
    comment:'电影名称'
  })
  name: string

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
    comment:'译名'
  })
  translation_name: string

  @Column({
    type: 'varchar',
    length: 32,
    default: '',
    comment:'产地'
  })
  place: string

  @Column({
    type: 'varchar',
    default: '',
    comment:'类别'
  })
  category: string

  @Column({
    type: 'varchar',
    length: 20,
    default: '',
    comment:'语言'
  })
  language: string

  @Column({
    type:'varchar',
    default: '',
    comment:'上映日期'
  })
  release_date: string

  @Column({
    type:'varchar',
    length:8,
    default:'',
    comment:'时长'
  })
  time_length: string

  @Column({
    type:'varchar',
    length:255,
    default:'',
    comment:'导演'
  })
  director: string

  @Column({
    type:'varchar',
    length:255,
    default:'',
    comment:'编剧'
  })
  writer: string

  @Column({
    type:'varchar',
    length:255,
    default:'',
    comment:'主演'
  })
  starring: string

  @CreateDateColumn()
  create_time:string

  @UpdateDateColumn()
  update_time:string

  @OneToMany(type => LinkEntity, link => link.movie)
  links: LinkEntity[];
}