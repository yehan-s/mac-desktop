import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendGroup } from './entitys/friend-group.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Friend } from './entitys/friend.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(FriendGroup)
    private friendGroupRepository: Repository<FriendGroup>,
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    private userService: UserService,
  ) {}

  // 创建好友分组
  async createFriendGroup(friendGroup: Partial<FriendGroup>) {
    const fgTemp = this.friendGroupRepository.create(friendGroup);
    const res = await this.friendGroupRepository.save(fgTemp);

    return res;
  }

  // 创建好友
  async createFriend(friend: Partial<Friend>) {
    // return '哈哈';
    const friendTemp = this.friendRepository.create(friend);
    const res = await this.friendRepository.save(friendTemp);
    return res;
  }

  // async create(chat: Partial<Chat>) {
  //   const chatTemp = await this.chatRepository.create(chat);
  //   const res = await this.chatRepository.save(chatTemp);
  //   return res;
  // }
}
