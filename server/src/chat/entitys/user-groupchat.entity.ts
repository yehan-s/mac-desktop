// 创建用户与群聊的中间表

import { Column, Entity } from 'typeorm';

@Entity()
export class UserGroupChat {
  @Column()
  user_id: number;
  @Column()
  group_id: number;
  @Column()
  unRead: number;
}
