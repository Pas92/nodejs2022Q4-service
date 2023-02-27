import { IsString, MinLength } from 'class-validator';

export class AuthEntity {
  @IsString()
  login: string;

  @MinLength(3)
  password: string;
}
