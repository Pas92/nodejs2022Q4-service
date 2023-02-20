import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null | ArtistEntity; // refers to Artist
  albumId: string | null | AlbumEntity; // refers to Album
  duration: number; // integer number
}
