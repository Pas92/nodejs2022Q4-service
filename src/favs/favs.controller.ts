import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsDto } from './dto/favs.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/album/:id')
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addAlbumToFav(id);
  }

  @Post('/artist/:id')
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addArtistToFav(id);
  }

  @Post('/track/:id')
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addTrackToFav(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteAlbumFromFav(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteArtistFromFav(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteTrackFromFav(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto) {
  //   return this.favsService.update(+id, updateFavDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.favsService.remove(+id);
  // }
}
