// export interface Friend {
//   id: number;
//   nickname: string;
//   avatar: string;
// }

export interface Friend {
  id: number;
  user_id: number;
  online_status: "online" | "offline"; // 假设在线状态只可能是'online'或'offline'
  group_id: number;
  room: string;
  unread_msg_count: number;
  created_at: string; // 如果想要更精确的类型，可以使用Date类型
  updated_at: string; // 同上
}
