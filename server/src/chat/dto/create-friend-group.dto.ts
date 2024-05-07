import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFriendGroupDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  password: string;
}
