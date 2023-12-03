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
import LocalFilesInterceptor from 'src/utils/local-files.interceptor';
import { LivesService } from './services/lives.service';
import { ProcessingService } from './services/processing.service';
import { VodsService } from './services/vods.service';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { CreateVodDto } from './dto/create-vod.dto';
import { User } from '@prisma/client';
import { UpdateVodDto } from './dto/update-vod.dto';
import { CreateLiveDto } from './dto/create-live.dto';
import { UpdateLiveDto } from './dto/update-live.dto';

@Controller('videos')
export class VideosController {
  constructor(
    private vodsService: VodsService,
    private livesService: LivesService,
    private processingService: ProcessingService,
  ) {}

  @Post('vods')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('video')) {
          return callback(
            new BadRequestException('Provide a valid video'),
            false,
          );
        }
        callback(null, true);
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

  @Get('vods/folder-names')
  async getUsedFolderNames() {
    const vods = await this.vodsService.findAllFolderNames();
    return vods.map((video) => video.folderName);
  }

  @Post('vods/:id/processing')
  async startProcess(@Param('id', ParseIntPipe) id: number) {
    return this.processingService.processVideo(id);
  }

  @Get('vods/:id/processing')
  async getProcessState(@Param('id', ParseIntPipe) id: number) {
    return this.processingService.getProcessPercent(id);
  }

  @Put('vods/:id')
  async updateVod(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVodDto,
  ) {
    return this.vodsService.update(id, dto);
  }

  @Delete('vods/:id')
  async deleteVod(@Param('id', ParseIntPipe) id: number) {
    return this.vodsService.delete(id);
  }

  @Post('lives')
  async createLive(@Body() dto: CreateLiveDto, @CurrentUser() user: User) {
    return this.livesService.create(dto, user);
  }

  @Put('lives/:id')
  async updateLive(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLiveDto,
  ) {
    return this.livesService.update(id, dto);
  }

  @Delete('lives/:id')
  async deleteLive(@Param('id', ParseIntPipe) id: number) {
    return this.livesService.delete(id);
  }

  @Get()
  async findAll() {
    return {
      vods: this.vodsService.findAll(),
      lives: this.livesService.findAll(),
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
