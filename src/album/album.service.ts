import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { AlbumStorage } from './storage/album.storage';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private storage: AlbumStorage) {}

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const album: AlbumEntity = { ...createAlbumDto, id: uuidv4() };
    this.storage.create(album);
    return album;
  }

  findAll(): AlbumEntity[] {
    return this.storage.findAll();
  }

  findOne(id: string): AlbumEntity {
    return this.storage.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    return this.storage.update(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
