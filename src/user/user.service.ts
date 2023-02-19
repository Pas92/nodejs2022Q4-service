import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<FindUserDTO> {
    const user: UserEntity = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
    };

    console.log(user);

    const newUser = await this.repository.save(user);
    const { password, ...returnedUser } = newUser; // eslint-disable-line
    return returnedUser;
  }

  async findAll(): Promise<FindUserDTO[]> {
    return (await this.repository.find()).map(this.deletePassword);
  }

  async findOne(id: string): Promise<FindUserDTO> {
    const user = await this.repository.findOneBy({ id: id });

    if (user === null) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    const { password, ...returnedUser } = user; // eslint-disable-line

    return returnedUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): FindUserDTO {
    return this.storage.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.repository.findOneBy({ id: id });
    console.log(user);

    if (user === null) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    this.repository.delete(id);
    // return this.storage.remove(id);
  }

  private deletePassword(user: UserEntity): FindUserDTO {
    const { password, ...returnedUser } = user; // eslint-disable-line
    return returnedUser;
  }
}
