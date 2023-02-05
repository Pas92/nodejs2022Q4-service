import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStorage } from './storage/artist.storage';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStorage],
  imports: [TrackModule],
  exports: [ArtistStorage],
})
export class ArtistModule {}
