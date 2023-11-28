import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import LocalFilesInterceptor from 'src/utils/localFiles.interceptor';
import { LivesService } from './lives.service';
import { ProcessingService } from './processing.service';
import { VodsService } from './vods.service';

@Controller('videos')
export class VideosController {
  constructor(
    private vodsService: VodsService,
    private livesService: LivesService,
    private processingService: ProcessingService,
  ) {}

  @Post()
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/videos',
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
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return this.vodsService.create({
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      title: file.originalname,
    });
  }

  @Post('/vods/:id')
  async startProcess(@Param('id', ParseIntPipe) id: number) {
    return this.processingService.processVideo(id);
  }

  @Get()
  async findAll() {
    return {
      vods: this.vodsService.findAll(),
      lives: this.livesService.findAll(),
    };
  }
}
