import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackStorage } from './storage/track.storage';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private storage: TrackStorage) {}

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const track: TrackEntity = { ...createTrackDto, id: uuidv4() };
    this.storage.create(track);
    return track;
  }

  findAll(): TrackEntity[] {
    return this.storage.findAll();
  }

  findOne(id: string): TrackEntity {
    return this.storage.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity {
    return this.storage.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
