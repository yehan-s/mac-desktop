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
    // const res = await this.chatService.createFriendGroup(body);
  }
}
