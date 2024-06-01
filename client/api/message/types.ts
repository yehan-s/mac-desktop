export interface SendMessageData {
  content: string;
  sender_id: number;
  receiver_id: number;
  room: string;
}

export interface GetMessagesResult {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  room: string;
  type: "private" | "group";
  media_type: "text" | "image" | "video" | "audio" | "file";
  created_at: string | Date; // 格式化后的时间是string类型
  // 群消息中需要的
  avatar?: string;
  nickname?: string;
}
