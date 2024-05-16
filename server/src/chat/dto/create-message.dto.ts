import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;
  @IsNumber()
  @IsNotEmpty()
  sender_id: number;
  @IsNumber()
  @IsNotEmpty()
  receiver_id: number;
  @IsString()
  room: string;
}
