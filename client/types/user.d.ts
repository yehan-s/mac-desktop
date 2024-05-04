export interface User {
  id: number;
  username: string;
  password: string;
  avatar: string;
  nickname: string;
  created_at: Date;
  signature: string | null;
}
