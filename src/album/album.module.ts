import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [TrackModule, TypeOrmModule.forFeature([AlbumEntity])],
})
export class AlbumModule {}
