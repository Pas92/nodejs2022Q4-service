import { IsUUID, IsInt, IsString, IsOptional } from 'class-validator';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../interfaces/album.interface';

@Entity()
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsInt()
  year: number;

  @ManyToOne((type) => ArtistEntity, (artist) => artist.albumIds)
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  @IsUUID(4)
  @IsOptional()
  artistId: string | null | ArtistEntity;
}
