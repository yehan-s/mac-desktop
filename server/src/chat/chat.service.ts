import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendGroup } from './entitys/friend-group.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Friend } from './entitys/friend.entity';
import { GroupChat } from './entitys/group-chat.entity';
import { Message } from './entitys/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(FriendGroup)
    private friendGroupRepository: Repository<FriendGroup>,
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @InjectRepository(GroupChat)
    private groupChatRepository: Repository<GroupChat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
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
    // const friendGroup = await this.friendGroupRepository.findOne({
    //   where: { name: '我的好友' },
    // });
    // return friendGroup;
  }

  // 查找好友 通过分组id
  async findFriendByGroupId(group_id: number) {
    // const res = await this.friendRepository.find({
    //   where: { group_i d },
    // });
    const res = await this.friendRepository
      .createQueryBuilder('friend')
      .where('friend.group_id = :group_id', { group_id })
      .leftJoinAndSelect('friend.user', 'user')
      .getMany();
    return res;
  }

  // 通过id查找name是 我的好友 的分组，然后添加好友
  // async addFriend() {
  //   const friendGroup = await this.friendGroupRepository.findOne({
  //     where: { name: '我的好友' },
  //   });
  // }

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

  // 创建消息
  async createMessage(message: Partial<Message>) {
    // return '创建消息';
    const messageTemp = this.messageRepository.create(message);
    const res = await this.messageRepository.save(messageTemp);
    return res;
  }

  // 查找消息 通过接收者的id
  // async findMessageByReceiverId(receiver_id: number) {
  //   const res = await this.messageRepository.find({
  //     where: { receiver_id },
  //   });
  //   return res;
  // }
  async findMessageByReceiverId(receiver_id: number) {
    const res = await this.messageRepository
      .createQueryBuilder('message')
      .select('message.content')
      .addSelect('message.created_at')
      // .leftJoinAndSelect('message.sender', 'senderss')
      .getMany();
    return res;
    // return '呵呵';
  }
}
