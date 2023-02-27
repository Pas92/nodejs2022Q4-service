import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TrackStorage } from 'src/track/storage/track.storage';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class ArtistStorage {
  private storage: ArtistEntity[] = [];

  constructor(private trackStorage: TrackStorage) {}

  create(artist: ArtistEntity): void {
    this.storage.push(artist);
  }

  findAll(): ArtistEntity[] {
    return this.storage;
  }

  findOne(id: string, isFavsSearch = false): ArtistEntity {
    const artist = this.storage.find((artist) => artist.id === id);
    if (artist === undefined && !isFavsSearch) {
      throw new NotFoundException(`Artist with ID ${id} does not found`);
    }

    return artist;
  }

  update(id: string, updateAlbumDto: UpdateArtistDto) {
    const artist = this.storage.find((artist) => artist.id === id);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with ID ${id} does not found`);
    }

    this.storage.filter((artist) => artist.id !== id);
    const updatedAlbum = Object.assign(artist, updateAlbumDto);
    this.storage.push(updatedAlbum);

    return updatedAlbum;
  }

  remove(id: string) {
    const artist = this.storage.find((artist) => artist.id === id);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with ID ${id} does not found`);
    }

    this.storage = this.storage.filter((artist) => artist.id !== id);
    this.trackStorage.deleteArtist(id);
  }
}
