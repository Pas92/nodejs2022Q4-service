import { MinLength } from 'class-validator';
import { UpdatePassword } from '../interfaces/user.interface';

export class UpdateUserDto implements UpdatePassword {
  @MinLength(3)
  oldPassword: string;

  @MinLength(3)
  newPassword: string;
}
