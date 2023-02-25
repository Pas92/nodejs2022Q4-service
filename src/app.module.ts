import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { APP_PIPE } from '@nestjs/core';
import { dtoValidationPipe } from './shared/validators/dto.validator';

import { ConfigModule } from '@nestjs/config';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './typeorm-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeORMConfig,
    }),
    UserModule,
    AlbumModule,
    TrackModule,
    ArtistModule,
    FavsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: dtoValidationPipe,
    },
  ],
})
export class AppModule {}
