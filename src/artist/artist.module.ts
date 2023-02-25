import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TrackModule, TypeOrmModule.forFeature([ArtistEntity])],
})
export class ArtistModule {}
