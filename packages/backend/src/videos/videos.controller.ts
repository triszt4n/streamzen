import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
    // todo: get from ffmpeg
    return id;
  }

  async updateVod() {} // todo
  async deleteVod() {} // todo
  async createLive() {} // todo
  async updateLive() {} // todo
  async deleteLive() {} // todo

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
