import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { MovieEntity } from '../movie/movie.entity'

@Entity('link')
export class LinkEntity {
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
    length: 32,
    default: ''
  })
  type: string

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  uri: string

  @Column({
    type: 'varchar',
    length: 6,
    default: ''
  })
  size: string

  @Column({
    type: 'varchar',
    length: 11,
    default: ''
  })
  quality: string

  @CreateDateColumn()
  create_time:string

  @UpdateDateColumn()
  update_time:string

  @ManyToOne(type => MovieEntity, movie => movie.links)
  movie: MovieEntity;
}