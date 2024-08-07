import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { GroupChat } from 'src/chat/entitys/group-chat.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // @InjectRepository(GroupChat)
    // private groupChatRepository: Repository<GroupChat>,
  ) {}
  // 查找全部
  async findAll() {
    // const res = await this.userRepository.find({
    //   relations: [
    //     'friendGroups',
    //     'friends',
    //     'groupChats',
    //     'sentMessages',
    //     'receivedMessages',
    //   ],
    // });
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.friendGroups', 'friendGroups')
      .leftJoinAndSelect('friendGroups.friends', 'friends')
      .leftJoinAndSelect('friends.user', 'userInfo')
      .leftJoinAndSelect('user.groupChats', 'groupChats')
      .getMany();
    return res;
  }
  // 创建用户
  async create(user: Partial<User>): Promise<User> {
    const userTemp = this.userRepository.create(user);
    // 密码加密
    // userTemp.password = await argon2.hash(userTemp.password);
    const res = await this.userRepository.save(userTemp);
    return res;
  }
  // 通过用户名查找(未用)
  async find(username: string) {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .leftJoinAndSelect('user.friendGroups', 'friendGroups')
      .leftJoinAndSelect('friendGroups.friends', 'friends')
      .getMany();
    return res;
  }

  async findUserByUserId(id: number) {
    const res = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.friendGroups', 'friendGroups')
      .leftJoinAndSelect('friendGroups.friends', 'friends')
      .leftJoinAndSelect('friends.user', 'userInfo')
      .leftJoinAndSelect('user.sentMessages', 'sentMessages')
      .leftJoinAndSelect('user.friends', 'friendShip')
      // .leftJoinAndSelect('user.groupChats', 'groupChats')
      .leftJoinAndSelect('user.groupMembers', 'groupMembers')
      .leftJoinAndSelect('groupMembers.group', 'groupChat')
      .getOne();
    return res;
  }
  // 通过用户名和密码查找
  async findUser(username: string, password: string) {
    if (!username || !password) {
      throw new NotFoundException('用户名或者密码不能为空');
    }
    console.log('findUser', username, password);
    return this.userRepository.findOne({
      where: { username, password },
    });
    // console.log('findUserResult', user);
  }
  // 通过用户名查找
  async findUserByUsername(username: string): Promise<User> {
    // console.log('findUserByUsername', username);
    if (!username) {
      throw new NotFoundException('用户名不能为空');
    }
    const res = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .leftJoinAndSelect('user.friendGroups', 'friendGroups')
      .leftJoinAndSelect('friendGroups.friends', 'friends')
      .leftJoinAndSelect('friends.user', 'userInfo')
      .leftJoinAndSelect('user.sentMessages', 'sentMessages')
      // .leftJoinAndSelect('user.friends', 'friendShip')
      // .leftJoinAndSelect('user.groupChats', 'groupChats')
      .leftJoinAndSelect('user.groupMembers', 'groupMembers')
      .leftJoinAndSelect('groupMembers.group', 'groupChat')
      .getOne();
    // res.groupChats = res.groupMembers;
    // res.groupChats.forEach((item) => {
    //   return (item = item.group);
    // });
    // res.groupChats = res.groupChats.map((item) => {
    //   return item.group;
    // });

    return res;
  }
  // 更新 （头像，昵称，签名）
  async updateUser(
    id: number,
    nickname: string,
    signature: string,
    avatar: string,
  ) {
    console.log('updateUser', nickname, signature, avatar);
    const res = await this.userRepository
      .createQueryBuilder('user')
      .where('id = :id', { id })
      .update(User)
      .set({ nickname, signature, avatar })
      .execute();

    if (res.affected > 0) {
      return '修改成功';
    } else {
      return '修改失败';
    }
  }
}
