import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
// import { Chat } from './chat.entity';

@WebSocketGateway(81, {
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection {
  constructor(private chatService: ChatService) {
    this.defaultGroup = 'TurboRoom';
  }

  groupVideoList: any[] = [];

  @WebSocketServer() server: Server;
  defaultGroup: string;

  // 有人连接时触发
  handleConnection(client: any) {
    // client.join(this.defaultGroup);
    // console.log('有链接进入', client.id);
    return '连接成功';
  }

  // 发送消息
  @SubscribeMessage('sendPrivate')
  handleMessage(
    @MessageBody() data: { room: string; content: string },
    @ConnectedSocket() client: Socket,
  ): string {
    console.log('接收到了消息', data);
    // 发送消息
    client.to(data.room).emit('sendPrivate', data); // 将消息仅广播给 'roomName' 房间内的所有客户端
    // 去更新左侧最后一条消息
    client.to(data.room).emit('updateLastMessage', data); // 发送给房间内其他客户端
    client.emit('updateLastMessage', data); // 也发送给自己
    return 'Hello world!';
  }

  @SubscribeMessage('inintialize')
  async inintialize(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    console.log('初始化成功', data);
    data.forEach((item: any) => {
      client.join(item.room);
    });
    return '初始化成功';
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    client.join(data.room);
    console.log('加入房间', data.room);
    console.log(client.rooms);
    return Promise.resolve('加入房间成功');
  }

  // 发送通话申请
  @SubscribeMessage('request_video')
  async request_video(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    console.log('请求视频', data, client.rooms);
    client.to(data.room).emit('receive_video', data); // 将消息仅广播给 'roomName' 房间内的所有客户端
    return '请求视频';
  }
  // 接受通话申请
  @SubscribeMessage('accept_video')
  async accept_video(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('接收通话', data);
    // this.server.in(data.room).emit('accept_video');
    client.to(data.room).emit('accept_video');
  }

  // 发送offer
  @SubscribeMessage('offer')
  async offer(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('offer', data);
    client.to(data.userInfo.room).emit('receive_offer', data.offer);
  }

  // 发送answer
  @SubscribeMessage('answer')
  async answer(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('answer', data);
    client.to(data.userInfo.room).emit('receive_answer', data.answer);
  }

  @SubscribeMessage('add_candidate')
  async add_candidate(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('add_candidate', data);
    client.to(data.room).emit('receive_candidate', data.candidate);
  }

  // 通话结束
  @SubscribeMessage('closeVideo')
  clsoeVideo(@MessageBody() data: any) {
    this.server.in(data).emit('closeVideo');
  }

  // 双方更新消息列表
  @SubscribeMessage('updateAllLastMessage')
  updateAllLastMessage(@MessageBody() data: any): Promise<string> {
    this.server.in(data.room).emit('updateLastMessage', data.from);
    return Promise.resolve('更新成功');
  }

  // @SubscribeMessage('createMessage')
  // handleMessage(
  //   @MessageBody() data: Partial<Chat>,
  //   @ConnectedSocket() client: Socket,
  // ): string {
  //   // this.chatService.create()
  //   console.log('接收到了消息', data, client.rooms);
  //   this.chatService.create(data);
  //   return 'Hello world!';
  // }

  @SubscribeMessage('groupJoinVideoRoom')
  groupJoinVideoRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.userInfo.room);
    this.groupVideoList.push(data.userInfo.nickname);
    // 第一个用户不需要进行以下操作
    if (this.groupVideoList.length <= 1) {
      return;
    }
    console.log('最新的', client.rooms);
    this.server
      .in(data.userInfo.room)
      .emit('groupJoinVideoRoom', data, this.groupVideoList);
  }

  @SubscribeMessage('groupOffer')
  async groupOffer(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    if (this.groupVideoList.length <= 1) {
      // 第一个用户登入
      console.log('第一个用户登入', data);
      return;
    }
    console.log('group_offer', data);
    client
      .to(data.userInfo.room)
      .emit('groupReceive_offer', data.offer, data.userInfo.room);
  }

  @SubscribeMessage('groupAnswer')
  async groupAnswer(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('answer', data);
    client
      .to(data.userInfo.room)
      .emit('groupReceive_answer', data.answer, data.userInfo.room);
  }
}
