import {
  IsDate,
  IsInt,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

import { User } from '../interfaces/user.interface';

export class UserEntity implements User {
  @IsUUID(4)
  id: string;

  @IsString()
  login: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsInt()
  version: number;

  @IsDate()
  createdAt: number;

  @IsDate()
  updatedAt: number;
}
