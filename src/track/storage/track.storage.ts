import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TrackStorage {
  private storage: TrackEntity[] = [];

  create(track: TrackEntity): void {
    this.storage.push(track);
  }

  findAll(): TrackEntity[] {
    return this.storage;
  }

  findOne(id: string): TrackEntity {
    const track = this.storage.find((track) => track.id === id);
    console.log(track);
    if (track === undefined) {
      throw new NotFoundException(`Track with ID ${id} does not found`);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.storage.find((track) => track.id === id);

    if (track === undefined) {
      throw new NotFoundException(`Track with ID ${id} does not found`);
    }

    this.storage = this.storage.filter((track) => track.id !== id);
    const updatedTrack = Object.assign(track, updateTrackDto);
    this.storage.push(updatedTrack);

    return updatedTrack;
  }

  remove(id: string) {
    const track = this.storage.find((track) => track.id === id);

    if (track === undefined) {
      throw new NotFoundException(`Track with ID ${id} does not found`);
    }

    this.storage = this.storage.filter((track) => track.id !== id);
  }
}
