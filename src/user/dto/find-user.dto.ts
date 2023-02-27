import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class FindUserDTO extends OmitType(UserEntity, ['password']) {}
