// 创建群成员 group_members 表
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { GroupChat } from './group-chat.entity';

@Entity()
export class GroupMember {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  group_id: number;

  @PrimaryColumn()
  user_id: number;

  @Column({ default: 0 })
  unRead: number;

  @ManyToOne(() => GroupChat, (groupChat) => groupChat.members)
  @JoinColumn({ name: 'group_id' })
  group: GroupChat;

  @ManyToOne(() => User, (user) => user.groupMembers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
