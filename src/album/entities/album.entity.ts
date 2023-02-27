import { IsUUID, IsInt, IsString, IsOptional } from 'class-validator';
import { Album } from '../interfaces/album.interface';

export class AlbumEntity implements Album {
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
