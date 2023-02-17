import { IsUUID, IsString, IsInt, IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../interfaces/track.interface';

// @Entity()
export class TrackEntity implements Track {
  // @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsUUID(4)
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID(4)
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}
