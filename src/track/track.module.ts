import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackStorage } from './storage/track.storage';
import TrackEntity from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService, TrackStorage],
  exports: [TrackStorage],
})
export class TrackModule {}
