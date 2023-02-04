import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumStorage } from './storage/album.storage';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumStorage],
})
export class AlbumModule {}
