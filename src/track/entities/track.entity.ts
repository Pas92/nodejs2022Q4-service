import { Exclude } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavEntity } from 'src/favs/entities/fav.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Track } from '../interfaces/track.interface';

@Entity()
export default class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  id: string; // uuid v4

  @Column()
  @IsString()
  name: string;

  @ManyToOne((type) => ArtistEntity, (artist) => artist.trackIds, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  @IsUUID(4)
  @IsOptional()
  artistId: string | null | ArtistEntity; // refers to Artist

  @ManyToOne((type) => AlbumEntity, (album) => album.trackIds, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'albumId',
    referencedColumnName: 'id',
  })
  @IsUUID(4)
  @IsOptional()
  albumId: string | null | AlbumEntity; // refers to Album

  @Column()
  @IsInt()
  duration: number; // integer number

  @Exclude({ toPlainOnly: true })
  @Column({
    nullable: true,
  })
  // @ManyToOne((type) => FavEntity, (favs) => favs.tracksArr)
  // @JoinTable()
  @IsBoolean()
  @IsOptional()
  isFavorite: boolean;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
