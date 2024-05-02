// 创建好友 friend 表
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/user.entity';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 'offline' })
  online_status: string;

  @Column({ nullable: true })
  remark: string;

  @Column({ nullable: true })
  group_id: number;

  @Column()
  room: string;

  @Column({ default: 0 })
  unread_msg_count: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.friends)
  user: User;

  @ManyToOne(() => User, (user) => user.friendGroups)
  group: User;
}
