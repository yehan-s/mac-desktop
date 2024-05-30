// 好友分组
export interface FriendGroup {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// 用户类型
export interface User {
  groupChats: any;
  id: number;
  username: string;
  password?: string;
  avatar: string;
  nickname: string;
  signature: string | null; // 使用字符串或null来允许signature为空
  created_at?: string | Date; // 日期通常作为字符串处理，除非你使用Date对象
  friendGroups?: FriendGroup[];
  joinedGroups?: any[]; // 如果你不清楚joinedGroups的具体结构，可以使用any
  friends?: any[];
}
