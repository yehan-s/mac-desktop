import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('/createFriendgroup')
  addFriendGroup(@Body() dto) {
    // return 'haa';
    const friendGroup = dto;
    return this.chatService.createFriendGroup(friendGroup);
  }

  @Post('/createFriend')
  addFriend(@Body() dto) {
    const friend = dto;
    return this.chatService.createFriend(friend);
  }
}
