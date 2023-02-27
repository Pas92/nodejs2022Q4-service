import { Injectable } from '@nestjs/common';
import { FavStorage } from './storage/favs.storage';

@Injectable()
export class FavsService {
  constructor(private storage: FavStorage) {}
  // create(createFavDto: CreateFavDto) {
  //   return 'This action adds a new fav';
  // }

  findAll() {
    return this.storage.findAll();
  }

  addAlbumToFav(id: string) {
    return this.storage.addAlbumToFav(id);
  }

  addArtistToFav(id: string) {
    return this.storage.addArtistToFav(id);
  }

  addTrackToFav(id: string) {
    return this.storage.addTrackToFav(id);
  }

  deleteAlbumFromFav(id: string) {
    return this.storage.deleteAlbumFromFav(id);
  }

  deleteArtistFromFav(id: string) {
    return this.storage.deleteArtistFromFav(id);
  }

  deleteTrackFromFav(id: string) {
    return this.storage.deleteTrackFromFav(id);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} fav`;
  // }

  // update(id: number, updateFavDto: UpdateFavDto) {
  //   return `This action updates a #${id} fav`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} fav`;
  // }
}
