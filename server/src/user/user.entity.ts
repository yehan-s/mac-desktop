// 创建用户 user 表
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { Friend } from '../chat/entitys/friend.entity';
import { Message } from '../chat/entitys/message.entity';
import { GroupChat } from '../chat/entitys/group-chat.entity';
import { GroupMembers } from '../chat/entitys/group-members.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // @Column()
  // phone: string;

  @Column({ default: 'https://img2.imgtp.com/2024/05/04/Db7YhuWN.png' })
  avatar: string;

  @Column({ nullable: true })
  nickname: string;

  // @Column()
  // salt: string;

  @Column({ nullable: true, type: 'longtext' })
  signature: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @OneToMany(() => Friend, (friend) => friend.user)
  friendGroups: Friend[];

  @OneToMany(() => GroupChat, (groupChat) => groupChat.creator)
  createdGroups: GroupChat[];

  @OneToMany(() => GroupMembers, (groupMembers) => groupMembers.user)
  groupMemberships: GroupMembers[];

  @ManyToMany(() => GroupChat, { eager: true })
  @JoinTable()
  joinedGroups: GroupChat[];

  @BeforeInsert()
  async setNickname() {
    if (!this.nickname) {
      this.nickname = this.username;
    }
  }
}
