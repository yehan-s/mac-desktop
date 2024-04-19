import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  findAll() {
    return 'This action returns all users yehan';
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
      relations: ['roles'],
    });
  }

  findUser(username, password) {
    return this.userRepository.findOne({
      where: { username, password },
    });
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }
}
