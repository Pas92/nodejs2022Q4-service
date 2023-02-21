import { Exclude } from 'class-transformer';
import { IsUUID, IsString, IsBoolean, IsOptional } from 'class-validator';
import { AlbumEntity } from 'src/album/entities/album.entity';
import TrackEntity from 'src/track/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../interfaces/artist.interface';

@Entity()
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsBoolean()
  grammy: boolean;

  @Exclude({ toPlainOnly: true })
  @OneToMany((type) => AlbumEntity, (album) => album.artistId)
  albumIds: string[];

  @Exclude({ toPlainOnly: true })
  @OneToMany((type) => TrackEntity, (track) => track.artistId)
  trackIds: string[];

  @Exclude({ toPlainOnly: true })
  @Column({
    nullable: true,
  })
  // @ManyToOne((type) => FavEntity, (favs) => favs.artistsArr)
  // @JoinTable()
  @IsBoolean()
  @IsOptional()
  isFavorite: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
