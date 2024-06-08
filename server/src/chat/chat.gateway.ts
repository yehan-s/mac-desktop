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

  @WebSocketServer() server: Server;
  defaultGroup: string;

  // 有人连接时触发
  handleConnection(client: any) {
    // client.join(this.defaultGroup);
    // console.log('有链接进入', client.id);
    return '连接成功';
  }

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
    console.log('我明明有', data);
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
    client.to(data.userInfo.room).emit('receive_candidate', data.candidate);
  }

  // 参收
  @SubscribeMessage('closeVideo')
  clsoeVideo(@MessageBody() data: any) {
    this.server.in(data).emit('closeVideo');
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
}
