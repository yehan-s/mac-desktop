import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendGroup } from './entitys/friend-group.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Friend } from './entitys/friend.entity';
import { GroupChat } from './entitys/group-chat.entity';
import { Message } from './entitys/message.entity';
import { v4 as uuidv4 } from 'uuid';

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

  // 创建好友  需要双方都添加 1.查找需要添加好友的用户id 2.查找我的好友分组id 3.添加好友
  async createFriend(friend: {
    user_id: number;
    friend_id: number;
    room?: string;
  }) {
    // user_id是我方的id friend_id是对方的id
    // 这里是需要添加的好友的id，保存下来，待会作为用户id
    let user_id = friend.user_id;
    let friend_id = friend.friend_id;
    // 房间id是socket.io的房间id，待会同样需要用到
    // 现在还没写方法，所以房间号先写死
    // let room_id = friend.room;
    const uuid = uuidv4();
    friend.room = uuid;
    // 查找要添加的分组下
    const friendGroup1 = await this.friendGroupRepository.findOne({
      where: { name: '我的好友', user_id },
      relations: ['friends'],
    });

    // return friendGroup1;
    if (friendGroup1.user_id === friend_id) {
      throw new ForbiddenException('不能添加自己为好友');
    }
    // 查找是否已经是好友
    const isFriend = friendGroup1.friends.some(
      (item) => item.user_id === friend_id,
    );
    if (isFriend) {
      throw new ForbiddenException('已经是好友');
    }
    // 我方的好友添加完成
    const friendTemp1 = this.friendRepository.create({
      // 好友的id 7
      user_id: friend_id,
      room: friend.room,
      group_id: friendGroup1.id,
    });
    await this.friendRepository.save(friendTemp1);
    // return friendGroup1;
    // 此时用户相互转换
    user_id = friend.friend_id;
    friend_id = friend.user_id;

    const friendGroup2 = await this.friendGroupRepository.findOne({
      where: { name: '我的好友', user_id },
    });
    // friend.group_id = friendGroup1.id;
    // 我方的好友添加完成
    const friendTemp2 = this.friendRepository.create({
      user_id: friend_id,
      room: friend.room,
      group_id: friendGroup2.id,
    });
    await this.friendRepository.save(friendTemp2);
    return '添加好友成功';
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

  // async findMessageByReceiverId(receiver_id: number) {
  //   // config.server
  //   const res = await this.messageRepository
  //     .createQueryBuilder('message')
  //     .select('message.content')
  //     .addSelect('message.created_at')
  //     // .leftJoinAndSelect('message.sender', 'senderss')
  //     .getMany();
  //   return res;
  //   // return '呵呵';
  // }
}
