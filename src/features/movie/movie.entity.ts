import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToMany } from 'typeorm'
import { LinkEntity } from '../link/link.entity'

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
    nullable:false
  })
  name: string

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  translation_name: string

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  place: string

  @Column({
    type: 'varchar',
    length: 20,
    default: ''
  })
  language: string

  @Column({
    type:'timestamp'
  })
  release_date: number

  @Column({
    type:'varchar',
    length:8,
    default:''
  })
  time_length: string

  @CreateDateColumn()
  create_time:string

  @UpdateDateColumn()
  update_time:string

  @OneToMany(type => LinkEntity, link => link.movie)
  links: LinkEntity[];
}