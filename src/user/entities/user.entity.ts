import { IsDate, IsInt, IsString, IsUUID, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../interfaces/user.interface';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  id: string;

  @Column()
  @IsString()
  login: string;

  @Column()
  @MinLength(3)
  password: string;

  @Column()
  @IsInt()
  version: number;

  @CreateDateColumn()
  @IsDate()
  createdAt?: Date | number;

  @UpdateDateColumn()
  @IsDate()
  updatedAt?: Date | number;
}
