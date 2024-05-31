// 创建群聊 group_chat 表
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { GroupMember } from './group-members.entity';

@Entity()
export class GroupChat {
  @PrimaryGeneratedColumn()
  id: number;

  // 群名
  @Column()
  name: string;

  @Column()
  creator_id: number;

  @Column({ default: 'https://img2.imgtp.com/2024/05/04/Db7YhuWN.png' })
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
  @JoinColumn({ name: 'creator_id' }) // 指定外键列的名称
  creator: User;

  @OneToMany(() => GroupMember, (groupMember) => groupMember.group, {
    cascade: true,
  })
  members: GroupMember[];

  // @ManyToMany(() => User, (user) => user.joinedGroups)
  // membersUser: User[];
  // @ManyToMany(() => User, (user) => user.groupChats)
  // members: User[];
}
