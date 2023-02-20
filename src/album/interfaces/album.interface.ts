import { ArtistEntity } from 'src/artist/entities/artist.entity';

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null | ArtistEntity; // refers to Artist
}
