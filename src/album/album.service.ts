import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  @InjectRepository(AlbumEntity)
  private readonly repository: Repository<AlbumEntity>;

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album: AlbumEntity = { ...createAlbumDto, id: uuidv4() };
    return await this.repository.save(album);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.repository.findOneBy({ id: id });
    if (album === null) {
      throw new NotFoundException(`Album with ID ${id} does not found`);
    }
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.repository.findOneBy({ id: id });
    if (album === null) {
      throw new NotFoundException(`Album with ID ${id} does not found`);
    }

    await this.repository.update(id, updateAlbumDto);

    const updatedUser = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['artistId'],
    });

    return {
      ...updatedUser,
      artistId: (updatedUser.artistId as ArtistEntity).id,
    };
  }

  async remove(id: string) {
    const album = await this.repository.findOneBy({ id: id });
    if (album === null) {
      throw new NotFoundException(`Album with ID ${id} does not found`);
    }

    await this.repository.delete(id);
  }
}
