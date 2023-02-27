import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { FindUserDTO } from './dto/find-user.dto';

import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import 'dotenv/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  async create(createUserDto: CreateUserDto): Promise<FindUserDTO> {
    const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const user: UserEntity = {
      ...createUserDto,
      password: hash,
      id: uuidv4(),
      version: 1,
    };

    const newUser = await this.repository.save(user);
    const { password, ...returnedUser } = newUser; // eslint-disable-line
    return this.convertDate(returnedUser);
  }

  async findAll(): Promise<FindUserDTO[]> {
    return (await this.repository.find())
      .map(this.deletePassword)
      .map(this.convertDate);
  }

  async findOne(id: string): Promise<FindUserDTO> {
    const user = await this.repository.findOneBy({ id: id });

    if (user === null) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    const { password, ...returnedUser } = user; // eslint-disable-line

    return this.convertDate(returnedUser);
  }

  async findOneByLogin(username: string): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ login: username });

    if (user === null) {
      throw new NotFoundException(
        `User with login '${username}' does not found`,
      );
    }

    console.log('Find User by Login');
    console.log(user);
    return this.convertDate(user) as UserEntity;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<FindUserDTO> {
    const user = await this.repository.findOneBy({ id: id });

    if (user === null) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    const isValidPassword = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Wrong password');
    }

    const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
    const newHash = await bcrypt.hash(updateUserDto.newPassword, salt);

    await this.repository.update(id, {
      password: newHash,
      version: user.version + 1,
    });

    const updatedUser = await this.repository.findOneBy({ id: id });

    const { password, ...returnedUser } = updatedUser; // eslint-disable-line

    return this.convertDate(returnedUser);
  }

  async remove(id: string) {
    const user = await this.repository.findOneBy({ id: id });

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

  private convertDate(
    user: FindUserDTO | UserEntity,
  ): FindUserDTO | UserEntity {
    return {
      ...user,
      updatedAt: new Date(user.updatedAt).getTime(),
      createdAt: new Date(user.createdAt).getTime(),
    };
  }
}
