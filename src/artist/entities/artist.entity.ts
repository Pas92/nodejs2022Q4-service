import { IsUUID, IsString, IsBoolean } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
