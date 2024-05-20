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
    console.log('有链接进入', client.id);
    return '连接成功';
  }

  @SubscribeMessage('demo')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log('接收到了消息', data, client.rooms);
    this.server.to(this.defaultGroup).emit('demo', data);
    return 'Hello world!';
  }

  @SubscribeMessage('inintialize')
  async inintialize(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    data.forEach((item: any) => {
      client.join(item.room);
    });
    return '初始化成功';
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
