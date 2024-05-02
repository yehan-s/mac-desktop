// 创建群聊 group_chat 表
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { GroupMembers } from './group-members.entity';

@Entity()
export class GroupChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  creator_id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, type: 'text' })
  announcement: string;

  @Column()
  room: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.createdGroups)
  creator: User;

  @OneToMany(() => GroupMembers, (groupMembers) => groupMembers.group)
  members: GroupMembers[];
}
