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
  created_at: Date; // 或者可以使用 Date 类型，如果你想要一个日期对象
}
