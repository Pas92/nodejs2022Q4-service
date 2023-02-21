import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavStorage } from './storage/favs.storage';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import TrackEntity from 'src/track/entities/track.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService, FavStorage],
  imports: [
    AlbumModule,
    ArtistModule,
    TrackModule,
    TypeOrmModule.forFeature([AlbumEntity, ArtistEntity, TrackEntity]),
  ],
})
export class FavsModule {}
