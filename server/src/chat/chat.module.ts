import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { Friend } from './entitys/friend.entity';
import { GroupChat } from './entitys/group-chat.entity';
import { FriendGroup } from './entitys/friend-group.entity';
import { GroupMembers } from './entitys/group-members.entity';
import { Message } from './entitys/message.entity';
import { MessageStatistics } from './entitys/message-statistics.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Friend,
      GroupChat,
      GroupMembers,
      Message,
      FriendGroup,
      MessageStatistics,
    ]),
    UserModule,
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
