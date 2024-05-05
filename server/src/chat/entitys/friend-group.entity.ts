// 创建分组 friend_group 表
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { Friend } from './friend.entity';

@Entity()
export class FriendGroup {
  @PrimaryGeneratedColumn()
  id: number;

  // 绑定user的id
  @Column()
  user_id: number;

  // @Column()
  // username: string;

  // 分组名称
  @Column()
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.friendGroups)
  @JoinColumn({ name: 'user_id' }) // 指定外键列的名称
  user: User;

  @OneToMany(() => Friend, (friend) => friend.group)
  friends: Friend[];
}
