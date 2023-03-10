import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert
} from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 100 })
  username: string

  @Column({ length: 100, select: false })
  password: string

  @Column({ nullable: true })
  age: string

  @Column({ default: '' })
  phone: string

  @Column({
    type: 'simple-array',
    nullable: true
  })
  hobby: string[]

  @Column({ default: 0 })
  gender: number

  @UpdateDateColumn({
    name: 'update_date'
  })
  updateDate: Date

  @CreateDateColumn({
    name: 'create_date'
  })
  createDate: Date

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password)
  }
}
