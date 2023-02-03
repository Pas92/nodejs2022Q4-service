import { OmitType } from '@nestjs/swagger';
import { TrackEntity } from '../entities/track.entity';

export class CreateTrackDto extends OmitType(TrackEntity, ['id']) {}
