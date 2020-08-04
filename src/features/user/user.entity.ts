import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  account: string

  @Column()
  nickName: string

  @Column({default:true})
  isActive: boolean
}