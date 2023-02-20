import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({
    summary: 'Get artists list',
    description: 'Gets all library artists list',
  })
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Gets single artist by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist information',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update library artist information by UUID',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.remove(id);
  }
}
