import { Exclude } from 'class-transformer';
import {
  IsUUID,
  IsInt,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import TrackEntity from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne((type) => ArtistEntity, (artist) => artist.albumIds, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  @IsUUID(4)
  @IsOptional()
  artistId: string | null | ArtistEntity;

  @Exclude({ toPlainOnly: true })
  @OneToMany((type) => TrackEntity, (track) => track.albumId)
  trackIds: string[];

  @Exclude()
  @Column({
    nullable: true,
  })
  // @ManyToOne((type) => FavEntity, (favs) => favs.albumsArr)
  // @JoinTable()
  @IsBoolean()
  @IsOptional()
  isFavorite: boolean;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
