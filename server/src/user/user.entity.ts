// 创建用户 user 表
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Friend } from '../chat/entitys/friend.entity';
import { Message } from '../chat/entitys/message.entity';
import { GroupChat } from '../chat/entitys/group-chat.entity';
import { FriendGroup } from '../chat/entitys/friend-group.entity';
import { GroupMember } from 'src/chat/entitys/group-members.entity';

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

  @OneToMany(() => Friend, (friend) => friend.user, { cascade: true })
  friends: Friend[];

  @OneToMany(() => Message, (message) => message.sender, { cascade: true })
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver, { cascade: true })
  receivedMessages: Message[];

  @OneToMany(() => FriendGroup, (friendGroup) => friendGroup.user, {
    cascade: true,
  })
  friendGroups: FriendGroup[];

  @OneToMany(() => GroupChat, (groupChat) => groupChat.creator, {
    cascade: true,
  })
  createdGroups: GroupChat[];

  @OneToMany(() => GroupMember, (groupMember) => groupMember.user, {
    cascade: true,
  })
  groupMembers: GroupMember[];
  user_id: any;
  groupChats: GroupMember[];

  // @ManyToMany(() => GroupChat, (groupChat) => groupChat.membersUser, {
  //   cascade: ['insert'],
  // })
  // @JoinTable({ name: 'users_chats' })
  // joinedGroups: GroupChat[];
  // @ManyToMany(() => GroupChat, (groupChat) => groupChat.members)
  // @JoinTable()
  // groupChats: GroupChat[];

  @BeforeInsert()
  async setNickname() {
    if (!this.nickname) {
      this.nickname = this.username;
    }
  }
}
