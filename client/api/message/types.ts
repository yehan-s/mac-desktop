export interface SendMessageData {
  content: string;
  sender_id: number;
  receiver_id: number;
  room: string;
}

export interface GetLastMessagesResult {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  room: string;
  type: "private";
  media_type: "text";
  created_at: string; // 格式化后的时间是string类型
}
