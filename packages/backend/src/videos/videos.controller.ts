import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { JwtAuth } from '../auth/decorator/jwt-auth.decorator';
import { CreateLiveDto } from './dto/create-live.dto';
import { CreateVodDto } from './dto/create-vod.dto';
import { UpdateLiveDto } from './dto/update-live.dto';
import { UpdateVodDto } from './dto/update-vod.dto';
import { LivesService } from './services/lives.service';
import { ProcessingService } from './services/processing.service';
import { VodsService } from './services/vods.service';
import { CollectionsService } from 'src/collections/collections.service';

@Controller('videos')
export class VideosController {
  constructor(
    private vodsService: VodsService,
    private livesService: LivesService,
    private processingService: ProcessingService,
    private collectionsService: CollectionsService,
  ) {}

  @JwtAuth()
  @Post('vods')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './media',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes('video')) {
          return cb(new BadRequestException('Provide a valid video'), false);
        }
        return cb(null, true);
      },
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateVodDto,
    @CurrentUser() user: User,
  ) {
    return this.vodsService.create(dto, user);
  }

  @JwtAuth()
  @Get('vods/folder-names')
  async getUsedFolderNames() {
    const vods = await this.vodsService.findAllFolderNames();
    return vods.map((video) => video.folderName);
  }

  @JwtAuth()
  @Get('lives/stream-keys')
  async getUsedStreamKeys() {
    const lives = await this.livesService.findAllStreamKeys();
    return lives.map((video) => video.localRtmpStreamKey);
  }

  @JwtAuth()
  @Post('vods/:id/processing')
  async startProcess(@Param('id', ParseIntPipe) id: number) {
    return this.processingService.processVideo(id);
  }

  @JwtAuth()
  @Get('vods/:id/processing')
  async getProcessState(@Param('id', ParseIntPipe) id: number) {
    return this.processingService.getProcessPercent(id);
  }

  @JwtAuth()
  @Put('vods/:id')
  async updateVod(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVodDto,
  ) {
    return this.vodsService.update(id, dto);
  }

  @JwtAuth()
  @Delete('vods/:id')
  async deleteVod(@Param('id', ParseIntPipe) id: number) {
    return this.vodsService.delete(id);
  }

  @Get('vods/:id')
  async getVodById(@Param('id', ParseIntPipe) id: number) {
    return this.vodsService.findOne(id);
  }

  @Get('lives/:id')
  async getLiveById(@Param('id', ParseIntPipe) id: number) {
    return this.livesService.findOne(id);
  }

  @JwtAuth()
  @Post('lives')
  async createLive(@Body() dto: CreateLiveDto, @CurrentUser() user: User) {
    return this.livesService.create(dto, user);
  }

  @JwtAuth()
  @Put('lives/:id')
  async updateLive(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLiveDto,
  ) {
    return this.livesService.update(id, dto);
  }

  @JwtAuth()
  @Delete('lives/:id')
  async deleteLive(@Param('id', ParseIntPipe) id: number) {
    return this.livesService.delete(id);
  }

  @Get('public')
  async findAllPublic() {
    return {
      vods: await this.vodsService.findAllProcessed(),
      lives: await this.livesService.findAllPremierAndOnAir(),
      collections: await this.collectionsService.findAll(),
    };
  }

  @JwtAuth()
  @Get()
  async findAll() {
    return {
      vods: await this.vodsService.findAll(),
      lives: await this.livesService.findAll(),
    };
  }

  @Get('vods')
  async findAllVods() {
    return this.vodsService.findAll();
  }

  @Get('lives')
  async findAllLives() {
    return this.livesService.findAll();
  }
}
