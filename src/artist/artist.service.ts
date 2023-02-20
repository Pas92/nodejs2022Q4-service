import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistStorage } from './storage/artist.storage';

import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  @InjectRepository(ArtistEntity)
  private readonly repository: Repository<ArtistEntity>;
  constructor(private storage: ArtistStorage) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist: ArtistEntity = { ...createArtistDto, id: uuidv4() };
    return await this.repository.save(artist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = await this.repository.findOneBy({ id: id });
    if (artist === null) {
      throw new NotFoundException(`Artist with ID ${id} does not found`);
    }
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.repository.findOneBy({ id: id });
    if (artist === null) {
      throw new NotFoundException(`Artist with ID ${id} does not found`);
    }

    await this.repository.update(id, updateArtistDto);

    return await this.repository.findOneBy({ id: id });
  }

  async remove(id: string) {
    const artist = await this.repository.findOneBy({ id: id });
    if (artist === null) {
      throw new NotFoundException(`Artist with ID ${id} does not found`);
    }

    await this.repository.delete(id);
  }
}
