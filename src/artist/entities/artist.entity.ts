import { IsUUID, IsString, IsBoolean } from 'class-validator';
import { Artist } from '../interfaces/artist.interface';

export class ArtistEntity implements Artist {
  @IsUUID(4)
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
