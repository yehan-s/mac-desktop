import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:username')
  getUserByName(@Param() params): Promise<User> {
    const username = params.username;
    console.log('bn', params);
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
    console.log('get', query);
    return this.userService.findUser(username, password);
  }
}
