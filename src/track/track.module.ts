import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackStorage } from './storage/track.storage';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackStorage],
  exports: [TrackStorage],
})
export class TrackModule {}
