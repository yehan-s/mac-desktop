import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendGroup } from './entitys/friend-group.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(FriendGroup)
    private friendGroupRepository: Repository<FriendGroup>,
    private userService: UserService,
  ) {}

  async createFriendGroup(friendGroup: Partial<FriendGroup>) {
    const fgTemp = await this.friendGroupRepository.create(friendGroup);
    const res = await this.friendGroupRepository.save(fgTemp);

    return res;
  }

  // async create(chat: Partial<Chat>) {
  //   const chatTemp = await this.chatRepository.create(chat);
  //   const res = await this.chatRepository.save(chatTemp);
  //   return res;
  // }
}
