import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserStorage } from './storage/user.storage';
import { FindUserDTO } from './dto/find-user.dto';

import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;
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
    const { password, ...returnedUser } = user; // eslint-disable-line

    return returnedUser;
  }

  async findAll(): Promise<FindUserDTO[]> {
    return (await this.repository.find()).map(this.deletePassword);
    // return this.storage.findAll();
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

  private deletePassword(user: UserEntity): FindUserDTO {
    const { password, ...returnedUser } = user; // eslint-disable-line
    return returnedUser;
  }
}
