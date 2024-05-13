import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // 创建好友分组
  @Post('/createFriendgroup')
  addFriendGroup(@Body() dto) {
    // return 'haa';
    const friendGroup = dto;
    return this.chatService.createFriendGroup(friendGroup);
  }
  // 创建好友
  @Post('/createFriend')
  addFriend(@Body() dto) {
    const friend = dto;
    return this.chatService.createFriend(friend);
  }
  // 查找分组下好友
  @Get('/findFriend/:group_id')
  findFriend(@Param() params) {
    const groupId = params.group_id;
    return this.chatService.findFriendByGroupId(groupId);
  }
  // 创建群聊
  @Post('/createGroupchat')
  addGroup(@Body() dto) {
    const group = dto;
    return this.chatService.createGroup(group);
  }
  // 创建消息
  @Post('/createMessage')
  addMessage(@Body() dto) {
    return this.chatService.createMessage(dto);
  }
  // 查找消息 通过接收者的id
  @Get('/findMessage/:receiver_id')
  findMessage(@Param() params) {
    const receiverId = params.receiver_id;
    return this.chatService.findMessageByReceiverId(receiverId);
  }
}
