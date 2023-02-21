import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import TrackEntity from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavsService {
  @InjectRepository(AlbumEntity)
  private readonly albumsRepo: Repository<AlbumEntity>;

  @InjectRepository(ArtistEntity)
  private readonly artistsRepo: Repository<ArtistEntity>;

  @InjectRepository(TrackEntity)
  private readonly tracksRepo: Repository<TrackEntity>;

  async findAll() {
    const albums: AlbumEntity[] = (
      await this.albumsRepo.find({
        where: {
          isFavorite: true,
        },
        select: {
          id: true,
          name: true,
          year: true,
        },
        relations: ['artistId'],
      })
    ).map((album) => {
      return {
        ...album,
        artistId: (album.artistId as ArtistEntity)?.id || null,
      };
    });

    const artists = await this.artistsRepo.find({
      where: {
        isFavorite: true,
      },
      select: {
        id: true,
        name: true,
        grammy: true,
      },
    });

    const tracks = (
      await this.tracksRepo.find({
        where: {
          isFavorite: true,
        },
        select: {
          id: true,
          name: true,
          albumId: true,
          artistId: true,
          duration: true,
        },
        relations: ['artistId', 'albumId'],
      })
    ).map((track) => {
      return {
        ...track,
        artistId: (track.artistId as ArtistEntity)?.id || null,
        albumId: (track.albumId as AlbumEntity)?.id || null,
      };
    });
    return { albums, artists, tracks };
  }

  async addAlbumToFav(id: string) {
    const album = await this.albumsRepo.findOneBy({ id: id });

    if (album === null) {
      throw new UnprocessableEntityException(
        `Album with ID ${id} does not exist`,
      );
    }

    await this.albumsRepo.update(id, { isFavorite: true });
  }

  async addArtistToFav(id: string) {
    const artist = await this.artistsRepo.findOneBy({ id: id });

    if (artist === null) {
      throw new UnprocessableEntityException(
        `Artist with ID ${id} does not exist`,
      );
    }

    await this.artistsRepo.update(id, { isFavorite: true });
  }

  async addTrackToFav(id: string) {
    const track = await this.tracksRepo.findOneBy({ id: id });

    if (track === null) {
      throw new UnprocessableEntityException(
        `Track with ID ${id} does not exist`,
      );
    }

    await this.tracksRepo.update(id, { isFavorite: true });
  }

  async deleteAlbumFromFav(id: string) {
    const album = await this.albumsRepo.findOneBy({ id: id });

    if (album === null || !album.isFavorite) {
      throw new UnprocessableEntityException(
        `Album with ID ${id} is not favorite`,
      );
    }

    await this.albumsRepo.update(id, { isFavorite: null });
  }

  async deleteArtistFromFav(id: string) {
    const artist = await this.artistsRepo.findOneBy({ id: id });

    if (artist === null || !artist.isFavorite) {
      throw new UnprocessableEntityException(
        `Artist with ID ${id} is not favorite`,
      );
    }

    await this.artistsRepo.update(id, { isFavorite: null });
  }

  async deleteTrackFromFav(id: string) {
    const track = await this.tracksRepo.findOneBy({ id: id });

    if (track === null || !track.isFavorite) {
      throw new UnprocessableEntityException(
        `Track with ID ${id} is not favorite`,
      );
    }

    await this.tracksRepo.update(id, { isFavorite: null });
  }
}
