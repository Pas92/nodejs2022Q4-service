import { Exclude } from 'class-transformer';
import { IsDate, IsInt, IsString, IsUUID, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'datetime',
  })
  @IsDate()
  createdAt: number;

  @Column({
    type: 'datetime',
  })
  @IsDate()
  updatedAt: number;
}
