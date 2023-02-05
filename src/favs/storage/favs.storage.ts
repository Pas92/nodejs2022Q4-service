import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumStorage } from 'src/album/storage/album.storage';
import { ArtistStorage } from 'src/artist/storage/artist.storage';
import { TrackStorage } from 'src/track/storage/track.storage';
import { FavsDto } from '../dto/favs.dto';
import { FavEntity } from '../entities/fav.entity';

@Injectable()
export class FavStorage {
  constructor(
    private albumStorage: AlbumStorage,
    private artistStorage: ArtistStorage,
    private trackStorage: TrackStorage,
  ) {}

  private storage: FavEntity = {
    albums: [],
    artists: [],
    tracks: [],
  };

  findAll(): FavsDto {
    const albums = this.albumStorage
      .findAll()
      .filter((album) => this.storage.albums.includes(album.id));

    const artists = this.artistStorage
      .findAll()
      .filter((artist) => this.storage.artists.includes(artist.id));

    const tracks = this.trackStorage
      .findAll()
      .filter((track) => this.storage.tracks.includes(track.id));
    return { albums, artists, tracks };
  }

  addAlbumToFav(id: string) {
    const album = this.albumStorage.findOne(id, true);

    if (album === undefined) {
      throw new UnprocessableEntityException(
        `Album with ID ${id} does not exist`,
      );
    }

    this.storage.albums.push(id);
  }

  addArtistToFav(id: string) {
    const artist = this.artistStorage.findOne(id, true);
    console.log('Find artist from favs');
    console.log(artist === undefined);

    if (artist === undefined) {
      throw new UnprocessableEntityException(
        `Artist with ID ${id} does not exist`,
      );
    }

    this.storage.artists.push(id);
  }

  addTrackToFav(id: string) {
    const track = this.trackStorage.findOne(id, true);

    if (track === undefined) {
      throw new UnprocessableEntityException(
        `Track with ID ${id} does not exist`,
      );
    }

    this.storage.tracks.push(id);
  }

  deleteAlbumFromFav(id: string) {
    if (!this.storage.albums.includes(id)) {
      throw new NotFoundException(`Album with ID ${id} is not favorite`);
    }

    this.storage.albums = this.storage.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  deleteArtistFromFav(id: string) {
    if (!this.storage.artists.includes(id)) {
      throw new NotFoundException(`Artist with ID ${id} is not favorite`);
    }

    this.storage.artists = this.storage.artists.filter(
      (artistId) => artistId !== id,
    );
  }

  deleteTrackFromFav(id: string) {
    if (!this.storage.tracks.includes(id)) {
      throw new NotFoundException(`Track with ID ${id} is not favorite`);
    }

    this.storage.tracks = this.storage.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
}
