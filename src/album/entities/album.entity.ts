import { IsUUID, IsInt, IsAlphanumeric, IsOptional } from 'class-validator';
import { Album } from '../interfaces/album.interface';

export class AlbumEntity implements Album {
  @IsUUID(4)
  id: string;

  @IsAlphanumeric()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID(4)
  artistId: string | null;
}
