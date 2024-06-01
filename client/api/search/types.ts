// 查找好友
export interface SearchFriend {}

// 查找群组
export interface SearchGroup {}

export interface GroupMember {
  group_id: number;
  user_id: number;
  unread: number;
}
