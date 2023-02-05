import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserStorage } from './storage/user.storage';
import { FindUserDTO } from './dto/find-user.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private storage: UserStorage) {}

  create(createUserDto: CreateUserDto): FindUserDTO {
    const user: UserEntity = {
      ...createUserDto,
      id: uuidv4(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    };
    this.storage.create(user);
    const { password, ...returnedUser } = user;

    return returnedUser;
  }

  findAll(): FindUserDTO[] {
    return this.storage.findAll();
  }

  findOne(id: string): FindUserDTO {
    return this.storage.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): FindUserDTO {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
