// 创建好友 friend 表
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { FriendGroup } from './friend-group.entity';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  // 指定的是好友的用户id
  @Column()
  user_id: number;

  @Column({ default: 'offline' })
  online_status: string;

  @Column({ nullable: true })
  group_id: number;

  @Column()
  @Generated('uuid')
  room: string;

  @Column({ default: 0 })
  unread_msg_count: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.friends)
  @JoinColumn({ name: 'user_id' }) // 指定外键列的名字
  user: User;

  @ManyToOne(() => FriendGroup, (friendGroup) => friendGroup.friends)
  @JoinColumn({ name: 'group_id' }) // 指定外键列的名称
  group: FriendGroup;
}
