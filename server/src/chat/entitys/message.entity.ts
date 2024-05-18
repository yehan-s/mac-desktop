// 创建消息 message 表
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
// import { format } from 'date-fns'; // 确保您已经安装了date-fns库
import { User } from '../../user/user.entity';
// import { BeijingDateTimeTransformer } from 'src/utils/BeijingDateTimeTransformer';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender_id: number;

  @Column()
  receiver_id: number;

  @Column({ type: 'longtext' })
  content: string;

  @Column()
  room: string;

  // type: 消息类型，枚举类型，可选值为’private’和’group’。
  @Column({ type: 'enum', enum: ['private', 'group'] })
  type: string;

  // media_type: 媒体类型，枚举类型，可选值为’text’、‘image’、‘video’和’file’。
  @Column({ type: 'enum', enum: ['text', 'image', 'video', 'file'] })
  media_type: string;

  // @Column({ nullable: true })
  // file_size: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  // 计算属性来获取格式化的日期字符串
  // get formattedCreatedAt(): string {
  //   return format(this.created_at, 'yyyy-MM-dd HH:mm');
  // }
}
