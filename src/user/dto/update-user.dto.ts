import { MinLength } from 'class-validator';
import { UpdatePassword } from '../interfaces/user.interface';

export class UpdateUserDto implements UpdatePassword {
  @MinLength(8)
  oldPassword: string;

  @MinLength(8)
  newPassword: string;
}
