export interface Message {
  id: number; 
  roomId: string;
  content: string;
  type: string;
  createAt: Date;
  sender_id: number;
  receiver_id: number;
}
