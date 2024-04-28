import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async create(chat: Partial<Chat>) {
    const chatTemp = await this.chatRepository.create(chat);
    const res = await this.chatRepository.save(chatTemp);
    return res;
  }
}
