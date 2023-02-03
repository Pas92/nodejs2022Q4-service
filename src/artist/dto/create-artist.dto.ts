import { OmitType } from '@nestjs/swagger';
import { ArtistEntity } from '../entities/artist.entity';

export class CreateArtistDto extends OmitType(ArtistEntity, ['id']) {}
