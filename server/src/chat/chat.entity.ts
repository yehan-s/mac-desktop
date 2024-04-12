import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Chat {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  roomId: string;

  @Column('text')
  content: string;

  @Column({
    default: 'text',
  })
  type: string;

  @Column({
    default: '',
  })
  size: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.chats)
  @JoinColumn({ name: 'userId' })
  user: User;
}
