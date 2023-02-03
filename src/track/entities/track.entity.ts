import { IsUUID, IsString, IsInt, IsOptional } from 'class-validator';
import { Track } from '../interfaces/track.interface';

export class TrackEntity implements Track {
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
