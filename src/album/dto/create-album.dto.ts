import { OmitType } from '@nestjs/swagger';
import { AlbumEntity } from '../entities/album.entity';

export class CreateAlbumDto extends OmitType(AlbumEntity, ['id']) {}
