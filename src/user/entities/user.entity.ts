import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // @Column()
  // age: number

  @UpdateDateColumn()
  updateDate: Date

  @CreateDateColumn()
  createDate: Date
}
