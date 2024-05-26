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
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/username/:username')
  getUserByName(@Param() params): Promise<User> {
    const username = params.username;
    return this.userService.findUserByUsername(username);
  }

  @Get('/userId/:userId')
  getUserById(@Param() params): Promise<User> {
    const userId = params.userId;
    return this.userService.findUserByUserId(userId);
  }

  @Post()
  addUser(@Body() dto: CreateUserDto): any {
    const user = dto as User;
    // console.log('post', dto, req, query);
    return this.userService.create(user);
  }

  @Get()
  getUser(@Query() query) {
    const { username, password } = query;
    return this.userService.findUser(username, password);
  }

  // @Post('/addGroupMember')
  // addGroupMember(@Body() dto): any {
  //   // return '好了';
  //   return this.userService.createGroupMember(dto.user_id, dto.group_id);
  // }
}
