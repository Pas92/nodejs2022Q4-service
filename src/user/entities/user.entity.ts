import { IsDate, IsInt, IsString, IsUUID, MinLength } from 'class-validator';

import { User } from '../interfaces/user.interface';

export class UserEntity implements User {
  @IsUUID(4)
  id: string;

  @IsString()
  login: string;

  @MinLength(8)
  password: string;

  @IsInt()
  version: number;

  @IsDate()
  createdAt: number;

  @IsDate()
  updatedAt: number;
}
