import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { FindUserDTO } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserStorage {
  private storage: UserEntity[] = [];

  create(user: UserEntity): void {
    this.storage.push(user);
  }

  findAll(): FindUserDTO[] {
    return this.storage;
  }

  findOne(id: string): FindUserDTO {
    const user = this.storage.find((user) => user.id === id);
    if (user === undefined) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.storage.find((user) => user.id === id);

    if (user === undefined) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }

    this.storage = this.storage.filter((user) => user.id !== id);
    user.password = updateUserDto.newPassword;
    user.updatedAt = new Date().getTime();
    user.version = user.version + 1;
    this.storage.push(user);

    const { password, ...returnedUser } = user; // eslint-disable-line

    return returnedUser;
  }

  remove(id: string) {
    const user = this.storage.find((user) => user.id === id);

    if (user === undefined) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    this.storage = this.storage.filter((user) => user.id !== id);
  }
}
