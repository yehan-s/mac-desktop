import { User } from "./user";

export interface GroupChat {
  id: number;
  name: string;
  creator_id: number;
  avatar: string;
  announcement: string | null;
  room: string;
  created_at: Date;
  updated_at: Date;
  creator: User;
  //   members: User[];
  // membersUser: User[]; // 如果需要，也可以包括这个属性
}
