import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne
} from 'typeorm'
import { User } from '../../user/entities/user.entity'

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'simple-array',
    nullable: true
  })
  hobby: string[]
}
