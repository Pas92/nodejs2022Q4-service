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

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  async create(createUserDto: CreateUserDto): Promise<FindUserDTO> {
    const user: UserEntity = {
      ...createUserDto,
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<FindUserDTO> {
    const user = await this.repository.findOneBy({ id: id });

    if (user === null) {
      throw new NotFoundException(`User with ID ${id} does not found`);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }

    console.log(user);

    await this.repository.update(id, {
      password: updateUserDto.newPassword,
      version: user.version + 1,
    });

    const updatedUser = await this.repository.findOneBy({ id: id });

    console.log(updatedUser);

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

  private convertDate(user: FindUserDTO): FindUserDTO {
    return {
      ...user,
      updatedAt: new Date(user.updatedAt).getTime(),
      createdAt: new Date(user.createdAt).getTime(),
    };
  }
}
