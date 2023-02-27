import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavStorage } from './storage/favs.storage';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService, FavStorage],
  imports: [AlbumModule, ArtistModule, TrackModule],
})
export class FavsModule {}
