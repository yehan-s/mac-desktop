import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  getUserByName(@Param() params): Promise<User> {
    const username = params.username;
    console.log(params);
    return this.userService.findUserByUsername(username);
  }

  @Post()
  addUser(@Body() dto): any {
    const user = dto as User;
    // console.log('post', dto, req, query);
    return this.userService.create(user);
  }

  @Get()
  getUser(@Query() query) {
    const { username, password } = query;
    return this.userService.findUser(username, password);
  }

  @Get()
  findAll(): string {
    return this.userService.findAll();
  }
}
