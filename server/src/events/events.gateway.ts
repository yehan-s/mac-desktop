import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(80, {
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  async handleConnection(client: Socket): Promise<string> {
    // default join public room
    // client.join(this.defaultGroup);
    // const users = await this.server.fetchSockets();

    // when a user join the room,sent him the messages
    // this.getMessages(client);
    // console.log(' ', Object.keys(users[0]))
    // console.log(' ', users[0].handshake.query.userId)
    // console.log('-0---------- ')
    console.log('这是socket.io的连接', client.id);
    return 'connect success';
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    console.log('这是socket.io的消息', data);
    return 'Hello world!';
  }
}
