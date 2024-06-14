import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private chatService: ChatService,
    private jwt: JwtService,
  ) {}
  async signIn(username: string, password: string) {
    console.log('signin', username, password);
    let user = await this.userService.findUserByUsername(username);

    // if (user) {
    //   console.log('user', user, typeof user);
    //   throw new ForbiddenException('用户名已存在');
    // }
    if (!user) {
      throw new UnauthorizedException('用户不存在，请注册');
    }

    // else {
    //   return 'auth错误找到用户';
    //   return user;
    // }

    user = await this.userService.findUser(username, password);
    // 用户密码比较
    // const isPasswordValid = await argon2.verify(user.password, password);

    if (!user) {
      // 如果比对不通过
      throw new UnauthorizedException('用户名或者密码错误');
    }

    // 生成token
    // return await this.jwt.signAsync(
    //   {
    //     username: (await user).username,
    //     sub: (await user).id,
    //   },
    //   {
    //     // token有效期 局部设置，一般在refresh中才使用局部
    //     expiresIn: '1d',
    //   },
    // );
    const payload = { username, password };
    return this.jwt.sign(payload);
  }

  async signUp(username: string, password: string) {
    // throw new Error('Method not implemented.');
    const user = await this.userService.findUserByUsername(username);
    if (user) {
      throw new ForbiddenException('用户名已存在');
    }
    const res = await this.userService.create({ username, password });

    // 初始化需要新建一个好友分组
    this.chatService.createFriendGroup({ user_id: res.id, name: '我的好友' });

    console.log('signup', res);
    return '注册成功';
  }
}
