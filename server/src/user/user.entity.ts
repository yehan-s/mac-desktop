import { Chat } from 'src/chat/chat.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'visitor',
  })
  username: string;

  @Column()
  password: string;

  @Column({
    default: '',
  })
  avatar: string;

  @Column({
    default: 'user',
  })
  role: string;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @CreateDateColumn()
  createdAt: Date;
}
