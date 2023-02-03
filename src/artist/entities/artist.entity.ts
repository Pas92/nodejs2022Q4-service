import { IsUUID, IsAlphanumeric, IsBoolean } from 'class-validator';
import { Artist } from '../interfaces/artist.interface';

export class ArtistEntity implements Artist {
  @IsUUID(4)
  id: string;

  @IsAlphanumeric()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
