import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // 创建好友分组
  @Post('/createFriendgroup')
  addFriendGroup(@Body() dto) {
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
  // 查找好友关系
  @Get('findFriendByRoom')
  findFriendByRoom(@Query() query) {
    return this.chatService.findFriendByRoom(query.room, query.user_id);
  }
  // 添加私聊未读消息
  @Post('/addPrivateUnread')
  addPrivateUnread(@Body() dto): Promise<string> {
    console.log('检测一下！！！！！', dto);
    const fn = () => 'unread_msg_count + 1';
    return this.chatService.updatePrivateUnread(dto.room, dto.user_id, fn);
  }
  // 清空私聊未读消息
  @Post('/clearPrivateUnread')
  claerPrivateUnread(@Body() dto): Promise<string> {
    const fn = () => '0';
    return this.chatService.updatePrivateUnread(dto.room, dto.user_id, fn);
  }
  // 添加群聊未读消息
  @Post('/addGroupUnread')
  addGroupUnread(@Body() dto) {
    console.log('检测一下！！！！！', dto);
    const fn = () => 'unread + 1';
    return this.chatService.updateGroupUnread(dto.room, dto.user_id, fn);
  }
  // 清空群聊未读
  @Post('/clearGroupUnread')
  updateClearGroupUnread(@Body() dto) {
    const fn = () => '0';
    return this.chatService.updateGroupUnread(dto.room, dto.user_id, fn);
  }

  // 创建群聊
  @Post('/createGroupchat')
  addGroup(@Body() dto) {
    const group = dto;
    return this.chatService.createGroup(group);
  }
  // 添加群聊下的用户
  @Post('/addGroupMember')
  addGroupMember(@Body() dto): any {
    // return '好了';
    return this.chatService.createGroupMember(dto.user_id, dto.group_id);
  }
  // 查找群聊下的用户
  @Get('/findGroupMember')
  findGroupMember(@Query() query) {
    return this.chatService.findGroupMember(query.room, query.user_id);
  }
  // 查找群聊
  @Get('/findGroupchat/:name')
  findGroupchat(@Param() params) {
    const name = params.name;
    return this.chatService.findGroupchatByName(name);
  }

  // 创建消息
  @Post('/createMessage')
  addMessage(@Body() dto: CreateMessageDto) {
    return this.chatService.createMessage(dto);
  }
  // 查找消息 通过RoomId 查找最后一条
  @Get('/findLastMessage/:room')
  findLastMessageByRoomId(@Param() params) {
    const room = params.room;
    return this.chatService.findLastMessageByRoom(room);
  }
  // 通过房间号查找消息
  @Get('/findMessage/:room')
  findMessageByRoomId(@Param() params) {
    const room = params.room;
    // 房间号 take skip
    return this.chatService.findMessageByRoom(room);
  }
  // 查找消息 通过接收者的id
  // @Get('/findMessage/:receiver_id')
  // findMessage(@Param() params) {
  //   const receiverId = params.receiver_id;
  //   return this.chatService.findMessageByReceiverId(receiverId);
  // }
}
