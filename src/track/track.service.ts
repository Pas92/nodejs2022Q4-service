import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import TrackEntity from './entities/track.entity';
import { TrackStorage } from './storage/track.storage';

import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class TrackService {
  @InjectRepository(TrackEntity)
  private readonly repository: Repository<TrackEntity>;
  constructor(private storage: TrackStorage) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const track: TrackEntity = { ...createTrackDto, id: uuidv4() };
    return await this.repository.save(track);
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['artistId', 'albumId'],
    });
    if (track === null) {
      throw new NotFoundException(`Track with ID ${id} does not found`);
    }

    console.log(track);
    return {
      ...track,
      artistId: (track.artistId as ArtistEntity)?.id || null,
      albumId: (track.albumId as AlbumEntity)?.id || null,
    };
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.repository.findOneBy({ id: id });
    if (track === null) {
      throw new NotFoundException(`Track with ID ${id} does not found`);
    }

    await this.repository.update(id, {
      ...updateTrackDto,
      artistId: updateTrackDto?.artistId || null,
      albumId: updateTrackDto?.albumId || null,
    });

    const updatedUser = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['artistId', 'albumId'],
    });

    return {
      ...updatedUser,
      artistId: (updatedUser.artistId as ArtistEntity)?.id || null,
      albumId: (updatedUser.albumId as AlbumEntity)?.id || null,
    };
  }

  async remove(id: string) {
    const track = await this.repository.findOneBy({ id: id });
    if (track === null) {
      throw new NotFoundException(`Track with ID ${id} does not found`);
    }

    await this.repository.delete(id);
  }
}
