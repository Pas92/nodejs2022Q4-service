import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStorage } from './storage/artist.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStorage],
  imports: [TrackModule, TypeOrmModule.forFeature([ArtistEntity])],

  exports: [ArtistStorage],
})
export class ArtistModule {}
