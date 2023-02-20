import { Exclude } from 'class-transformer';
import { IsUUID, IsString, IsBoolean } from 'class-validator';
import { AlbumEntity } from 'src/album/entities/album.entity';
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
}
