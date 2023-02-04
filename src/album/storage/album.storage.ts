import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

@Injectable()
export class AlbumStorage {
  private readonly storage: AlbumEntity[] = [];

  create(album: AlbumEntity): void {
    this.storage.push(album);
  }

  findAll(): AlbumEntity[] {
    return this.storage;
  }

  findOne(id: string): AlbumEntity {
    const album = this.storage.find((album) => album.id === id);
    console.log(album);
    if (album === undefined) {
      throw new NotFoundException(`Album with ID ${id} does not found`);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.storage.find((album) => album.id === id);

    if (album === undefined) {
      throw new NotFoundException(`Album with ID ${id} does not found`);
    }

    this.storage.filter((album) => album.id !== id);
    const updatedAlbum = Object.assign(album, updateAlbumDto);
    this.storage.push(updatedAlbum);

    return updatedAlbum;
  }

  remove(id: string) {
    const album = this.storage.find((album) => album.id === id);

    if (album === undefined) {
      throw new NotFoundException(`Album with ID ${id} does not found`);
    }

    this.storage.filter((album) => album.id !== id);
  }
}
