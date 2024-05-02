// 创建群成员 group_members 表
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/user.entity';
import { GroupChat } from './group-chat.entity';

@Entity()
export class GroupMembers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group_id: number;

  @Column()
  user_id: number;

  @Column()
  nickname: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => GroupChat, (groupChat) => groupChat.members)
  group: GroupChat;

  @ManyToOne(() => User, (user) => user.groupMemberships)
  user: User;
}
