import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserStorage {
  private storage: UserEntity[] = [];

  create(user: UserEntity): void {
    this.storage.push(user);
  }

  findAll(): UserEntity[] {
    return this.storage;
  }

  findOne(id: string): UserEntity {
    const user = this.storage.find((user) => user.id === id);
    console.log(user);
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

    this.storage.filter((user) => user.id !== id);
    const updatedUser = Object.assign(user, updateUserDto);
    this.storage.push(updatedUser);

    return updatedUser;
  }

  remove(id: string) {
    const user = this.storage.find((user) => user.id === id);

    if (user === undefined) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    this.storage = this.storage.filter((user) => user.id !== id);
  }
}
