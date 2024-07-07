import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendGroup } from './entitys/friend-group.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Friend } from './entitys/friend.entity';
import { GroupChat } from './entitys/group-chat.entity';
import { Message } from './entitys/message.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/user.entity';
import { GroupMember } from './entitys/group-members.entity';
// import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(FriendGroup)
    private friendGroupRepository: Repository<FriendGroup>,
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @InjectRepository(GroupChat)
    private groupChatRepository: Repository<GroupChat>,
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
    // 注入members属性
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private userService: UserService,
    // private chatGateway: ChatGateway,
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
    const uuid = uuidv4();
    friend.room = uuid;
    console.log('uuid', uuid);
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
      user_id: friend_id,
      room: friend.room,
      group_id: friendGroup1.id,
    });
    await this.friendRepository.save(friendTemp1);

    // 此时用户相互转换 为对方也添加好友关系
    user_id = friend.friend_id;
    friend_id = friend.user_id;

    const friendGroup2 = await this.friendGroupRepository.findOne({
      where: { name: '我的好友', user_id },
    });
    // 对方的好友添加完成
    const friendTemp2 = this.friendRepository.create({
      user_id: friend_id,
      room: friend.room,
      group_id: friendGroup2.id,
    });
    const res = await this.friendRepository.save(friendTemp2);

    // TODO:发送初始消息 ?? TODO:刷新左侧列表 未作，7/3
    const message = {
      sender_id: friend.user_id,
      receiver_id: friend.friend_id,
      content: '我们已经是好友了',
      room: friend.room,
      type: 'private',
      media_type: 'text',
    };
    this.createMessage(message);
    // 添加未读 发反了
    // 刷新消息
    // this.chatGateway.updateAllLastMessage({
    //   room: friend.room,
    //   from: 'addFriend',
    // });

    return res;
  }

  // 查找好友 通过分组id
  async findFriendByGroupId(group_id: number) {
    const res = await this.friendRepository
      .createQueryBuilder('friend')
      .where('friend.group_id = :group_id', { group_id })
      .leftJoinAndSelect('friend.user', 'user')
      .getMany();
    return res;
  }

  // 查找好友关系 通过房间号
  async findFriendByRoom(room: string, user_id: number) {
    // console.log('看看信息', room, user_id);
    const res = await this.friendRepository
      .createQueryBuilder('friend')
      .where('friend.user_id = :user_id', {
        user_id,
      })
      .leftJoinAndSelect('friend.user', 'user')
      .getOne();
    // const res = await this.friendRepository.findOne({ where: { user_id } });
    if (res === null) {
      return '没有找到好友';
    }
    return res;
  }

  // 添加未读消息私聊
  async updatePrivateUnread(room: string, user_id: number, fn) {
    const res = await this.friendRepository
      .createQueryBuilder('friend')
      .where('friend.room = :room AND friend.user_id = :user_id', {
        room,
        user_id,
      })
      .update(Friend)
      .set({ unread_msg_count: fn })
      .execute();
    if (!res) {
      return '没有找到好友';
    }
    // res.unread_msg_count += 1;
    return '添加成功';
  }

  // 添加未读消息群聊
  async updateGroupUnread(room: string, user_id: number, fn) {
    const groupchatResult = await this.groupChatRepository.findOne({
      where: { room },
    });
    if (!groupchatResult) {
      return '没有找到群聊';
    }
    const group_id = groupchatResult.id;
    // return groupResult;
    const res =
      await this.groupMemberRepository.createQueryBuilder('groupMember');
    // 不是0说明是要未读消息+1
    if (fn() !== '0') {
      res
        .where('group_id = :group_id AND user_id != :user_id', {
          group_id,
          user_id,
        })
        .update(GroupMember)
        .set({ unread: fn })
        .execute();
    } else {
      res
        .where('group_id = :group_id AND user_id = :user_id', {
          group_id,
          user_id,
        })
        .update(GroupMember)
        .set({ unread: fn })
        .execute();
    }
    if (!res) {
      return '没有找到群成员关系';
    }
    // res.unread_msg_count += 1;
    return '添加成功';
  }

  // 通过id查找name是 我的好友 的分组，然后添加好友
  // async addFriend() {
  //   const friendGroup = await this.friendGroupRepository.findOne({
  //     where: { name: '我的好友' },
  //   });
  // }

  // 创建群聊
  async createGroup(group: Partial<GroupChat>) {
    group.room = uuidv4();
    const creator = await this.userService.findUserByUserId(group.creator_id);
    if (!creator) {
      throw new NotFoundException('creator not found');
    }
    const groupTemp = this.groupChatRepository.create(group);
    // 添加创建者到群聊的成员数组中
    // groupTemp.members = [creator];
    // 这样中间表会添加数据
    const res = await this.groupChatRepository.save(groupTemp);
    const addGMData = {
      user_id: res.creator_id,
      group_id: res.id,
    };
    this.createGroupMember(addGMData.user_id, addGMData.group_id);
    // 发一条默认消息
    const message = {
      sender_id: group.creator_id,
      receiver_id: group.creator_id,
      content: '群的第一条消息',
      room: group.room,
      type: 'group',
      media_type: 'text',
    };
    this.createMessage(message);
    return res;
  }

  // 往群聊里添加用户
  async createGroupMember(user_id: number, group_id: number) {
    // 找到群聊;
    const groupChat = await this.groupChatRepository.findOne({
      where: {
        id: group_id,
      },
      relations: ['members'],
    });
    if (!groupChat) {
      throw new NotFoundException('Group chat not found');
    }
    console.log('groupChat', groupChat);
    // 找到用户
    const user = await this.userService.findUserByUserId(user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // FIXME:找到用户是否已经在群聊的成员列表中
    // const isMember = groupChat.members.some((item) => item.id === user.id);
    const isMember = groupChat.members.some(
      (member) => member.user_id === user.id,
    );
    if (isMember) {
      throw new ForbiddenException('请勿重复添加');
    }
    // 将用户添加到群聊的成员列表中（手动添加中间表）
    const res = await this.groupMemberRepository.create({ user_id, group_id });
    await this.groupMemberRepository.save(res);
    return res;
    // 将用户添加到群聊的成员列表中;
    // const memberlist: User[] = [];
    // groupChat.members.forEach((item) => {
    //   memberlist.push(item);
    // });
    //   if (!memberlist.find((member) => member.id === user.id)) {
    //     memberlist.push(user);
    //   } else {
    //     throw new ForbiddenException('请勿的重复添加');
    //   }
    //   groupChat.members = memberlist;
    //   // 保存群聊以更新数据库;
    //   await this.groupChatRepository.save(groupChat);
    //   return groupChat;
  }

  // 通过房间号查找群聊成员表（为了未读消息）
  async findGroupMember(room: string, user_id: number) {
    const groupchatResult = await this.groupChatRepository.findOne({
      where: { room },
      relations: ['members'],
    });
    if (!groupchatResult) {
      return '没有找到群聊';
    }
    const group_id = groupchatResult.id;
    const res = await this.groupMemberRepository.findOne({
      where: { group_id, user_id },
    });
    return res;
  }
  // 查找群聊下所有用户
  async findAllGroupMember(room: string) {
    console.log('room', room);
    const groupchatResult = await this.groupChatRepository
      .createQueryBuilder('groupChat')
      .where({ room })
      .leftJoinAndSelect('groupChat.members', 'groupMember')
      .leftJoinAndSelect('groupMember.user', 'user')
      .getOne();
    const memberList = [];

    groupchatResult.members.forEach((item) => {
      memberList.push(item.user);
    });
    return memberList;
  }
  // 搜索群聊通过群名
  async findGroupchatByName(name: string) {
    const res = await this.groupChatRepository
      .createQueryBuilder('groupChat')
      .where({ name })
      .leftJoinAndSelect('groupChat.members', 'members')
      .getOne();
    return res;
  }

  // 创建消息
  async createMessage(message: Partial<Message>) {
    try {
      const messageTemp = this.messageRepository.create(message);
      const res = await this.messageRepository.save(messageTemp);
      return res;
    } catch (error) {
      console.log('发送消息出错', error);
    }
  }

  // 查找消息 通过RoomId
  async findLastMessageByRoom(room: string) {
    const res = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.room = :room', { room })
      // .leftJoinAndSelect('message.receiver', 'receiver')
      .orderBy('message.created_at', 'DESC')
      .getOne();
    if (!res) {
      return null;
    }
    // 需求，如果create的时间离现在时间在24小时之内，则只返回HH:mm:ss，
    // 如果大于24小时则只返回YYYY-MM-DD
    const now = new Date();
    const createdAt = new Date(res.created_at);
    const timeDiff = now.getTime() - createdAt.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    let formattedDate: string;
    if (hoursDiff <= 24) {
      // 如果时间差在24小时之内，只返回小时、分钟和秒
      formattedDate = createdAt.toLocaleString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Shanghai',
      });
    } else {
      // 如果时间差大于24小时，只返回年、月和日
      formattedDate = createdAt
        .toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: 'Asia/Shanghai',
        })
        .replace(/\//g, '-'); // 使用 - 替换 /
    }

    // 创建一个新对象来避免直接修改实体属性
    const formattedMessage: any = { ...res };
    formattedMessage.created_at = formattedDate;
    return formattedMessage;
    // return res;
  }

  async findMessageByRoom(room: string) {
    const res = await this.messageRepository
      // .createQueryBuilder('message')
      // .where('message.room = :room', { room })
      // .orderBy('message.created_at', 'ASC')
      // // .skip(40) // 跳过前20条记录
      // .take(10) // 限制结果为10条记录
      // .getMany();

      // 先后获最后几个消息
      .createQueryBuilder('message')
      .where('message.room = :room', { room })
      .orderBy('message.created_at', 'ASC')
      // .skip(40) // 跳过前20条记录
      // .take(20) // 限制结果为10条记录
      .getMany();
    if (!res) {
      return null;
    }
    // 需求，如果create的时间离现在时间在24小时之内，则只返回HH:mm:ss，
    // 如果大于24小时则只返回YYYY-MM-DD
    // const now = new Date();
    // const createdAt = new Date(res.created_at);
    // const timeDiff = now.getTime() - createdAt.getTime();
    // const hoursDiff = timeDiff / (1000 * 60 * 60);

    // let formattedDate: string;
    // if (hoursDiff <= 24) {
    //   // 如果时间差在24小时之内，只返回小时、分钟和秒
    //   formattedDate = createdAt.toLocaleString('zh-CN', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     hour12: false,
    //     timeZone: 'Asia/Shanghai',
    //   });
    // } else {
    //   // 如果时间差大于24小时，只返回年、月和日
    //   formattedDate = createdAt
    //     .toLocaleString('zh-CN', {
    //       year: 'numeric',
    //       month: '2-digit',
    //       day: '2-digit',
    //       timeZone: 'Asia/Shanghai',
    //     })
    //     .replace(/\//g, '-'); // 使用 - 替换 /
    // }

    // // 创建一个新对象来避免直接修改实体属性
    // const formattedMessage: any = { ...res };
    // formattedMessage.created_at = formattedDate;
    // return formattedMessage;
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
