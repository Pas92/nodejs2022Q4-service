import { IsUUID, IsString, IsBoolean } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../interfaces/artist.interface';

// @Entity()
export class ArtistEntity implements Artist {
  // @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
