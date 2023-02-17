import { IsUUID } from 'class-validator';
import { Entity } from 'typeorm';
import { Favorites } from '../interfaces/fav.interface';

export class FavEntity implements Favorites {
  @IsUUID(4, {
    each: true,
  })
  artists: string[];

  @IsUUID(4, {
    each: true,
  })
  albums: string[];

  @IsUUID(4, {
    each: true,
  })
  tracks: string[];
}
