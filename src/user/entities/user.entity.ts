import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Posts } from '../../posts/entities/post.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 100 })
  username: string

  @Column({ length: 100, select: false })
  password: string

  @Column({ default: '' })
  phone: string

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

  @OneToOne(type => Posts)
  @JoinColumn()
  posts: Posts

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password)
  }
}
