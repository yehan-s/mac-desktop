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
  async findAll() {
    const res = await this.userRepository.find({ relations: ['friendGroups'] });
    return res;
  }

  async create(user: Partial<User>): Promise<any> {
    // throw new Error('Method not implemented.');
    // console.log(user);
    const userTemp = await this.userRepository.create(user);
    // 密码加密
    // userTemp.password = await argon2.hash(userTemp.password);
    const res = await this.userRepository.save(userTemp);
    return res;
  }

  find(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['friend_group'],
    });
  }

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

  async findUserByUsername(username: string) {
    console.log('findUserByUsername', username);
    if (!username) {
      return null;
    }
    return this.userRepository.findOne({
      where: { username },
    });
  }
}
