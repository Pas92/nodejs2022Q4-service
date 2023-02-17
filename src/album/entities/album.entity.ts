import { IsUUID, IsInt, IsString, IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../interfaces/album.interface';

// @Entity()
export class AlbumEntity implements Album {
  // @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  id: string;

  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUID(4)
  @IsOptional()
  artistId: string | null;
}
