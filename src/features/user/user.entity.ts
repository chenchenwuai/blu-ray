import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
  	type: 'varchar',
  	length: 32,
  	unique: true,
  	nullable: false
  })
  account: string

  @Column({
  	type: 'varchar',
  	length: 255,
  	nullable: false
  })
  password: string

  @Column({
  	type: 'varchar',
  	length: 32,
  	nullable: false
  })
  nickname: string

  @Column({
  	type: 'varchar',
  	length: 32,
  	default: ''
  })
  phone: string

  @Column({
  	type: 'varchar',
  	length: 255,
  	default: ''
  })
  email: string

  @Column({
  	type: 'tinyint',
  	default: 1
  })
  is_active: number

  @Column({
  	type: 'tinyint',
  	default: 0
  })
  is_delete: number

  @CreateDateColumn()
  create_time:string

  @UpdateDateColumn()
  update_time:string
}
