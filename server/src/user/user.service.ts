import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // 查找全部
  async findAll() {
    const res = await this.userRepository.find({
      relations: ['friendGroups', 'friends', 'groupChats'],
    });
    return res;
  }
  // 创建用户
  async create(user: Partial<User>): Promise<any> {
    const userTemp = this.userRepository.create(user);
    // 密码加密
    // userTemp.password = await argon2.hash(userTemp.password);
    const res = await this.userRepository.save(userTemp);
    return res;
  }
  // 通过用户名查找(未用)
  find(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['friendGroups', 'friends', 'groupChats'],
    });
  }
  findUserByUserId(id: number) {
    return this.userRepository.findOne({
      where: { id },
      // relations: ['friendGroups', 'friends'],
    });
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
  async findUserByUsername(username: string) {
    // console.log('findUserByUsername', username);
    if (!username) {
      return null;
    }
    return this.userRepository.findOne({
      where: { username },
      relations: ['friendGroups', 'friends', 'groupChats'],
    });
  }
}
