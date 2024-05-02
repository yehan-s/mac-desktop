// 创建消息统计 message_statistics 表
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MessageStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room: string;

  @Column()
  total: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
