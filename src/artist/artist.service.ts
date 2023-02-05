import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistStorage } from './storage/artist.storage';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private storage: ArtistStorage) {}

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    const artist: ArtistEntity = { ...createArtistDto, id: uuidv4() };
    this.storage.create(artist);
    return artist;
  }

  findAll(): ArtistEntity[] {
    return this.storage.findAll();
  }

  findOne(id: string): ArtistEntity {
    return this.storage.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
    return this.storage.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
