// import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
// import { ArtistEntity } from 'src/artist/entities/artist.entity';
// import { Entity, OneToMany } from 'typeorm';
import { Favorites } from '../interfaces/fav.interface';

// @Entity()
export class FavEntity implements Favorites {
  // @Exclude({ toPlainOnly: true })
  // @OneToMany((type) => ArtistEntity, (artist) => artist.isFavorite)
  // artistsArr?: string[];

  // @Exclude({ toPlainOnly: true })
  // @OneToMany((type) => ArtistEntity, (album) => album.isFavorite)
  // albumsArr?: string[];

  // @Exclude({ toPlainOnly: true })
  // @OneToMany((type) => ArtistEntity, (track) => track.isFavorite)
  // tracksArr?: string[];

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
