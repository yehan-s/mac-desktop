import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendGroup } from './entitys/friend-group.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Friend } from './entitys/friend.entity';
import { GroupChat } from './entitys/group-chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(FriendGroup)
    private friendGroupRepository: Repository<FriendGroup>,
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @InjectRepository(GroupChat)
    private groupChatRepository: Repository<GroupChat>,
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
    const friendTemp = this.friendRepository.create(friend);
    const res = await this.friendRepository.save(friendTemp);
    return res;
  }

  // 查找好友通过分组id
  async findFriendByGroupId(group_id: number) {
    const res = await this.friendRepository.find({
      where: { group_id },
    });
    return res;
  }

  // 创建群聊
  async createGroup(group: Partial<GroupChat>) {
    const groupTemp = this.groupChatRepository.create(group);
    const creator = await this.userService.findUserByUserId(group.creator_id);
    // 添加创建者到群聊的成员数组中
    groupTemp.members = [creator];
    // 这样中间表会添加数据
    const res = await this.groupChatRepository.save(groupTemp);
    return res;
  }
}
