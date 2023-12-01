import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { StreamService } from 'src/stream/stream.service';
import FfmpegEndedEvent from 'src/videos/events/ffmpeg-ended.event';
import FfmpegErrorEvent from 'src/videos/events/ffmpeg-error.event';
import { VodsService } from './vods.service';
import { ProcessState } from '@prisma/client';

@Injectable()
export class ProcessingService {
  constructor(
    private eventEmitter: EventEmitter2,
    private configService: ConfigService,
    private vodsService: VodsService,
  ) {
    ffmpeg.setFfmpegPath(this.configService.get<string>('FFMPEG_PATH'));
  }

  private readonly logger = new Logger(StreamService.name);

  // todo make async
  async processVideo(videoId: number) {
    const vod = await this.vodsService.updateState(
      videoId,
      ProcessState.PROCESSING,
    );
    const { folderName, fileName, ext } = vod;

    ffmpeg(join(process.cwd(), 'media', folderName, fileName + '.' + ext), {
      timeout: 432000,
    })
      .addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-s 640x360', // 640px width, 360px height
        '-start_number 0',
        '-hls_time 10', // 10 second chunks
        '-hls_list_size 0',
        '-f hls',
      ])
      .output(join(process.cwd(), 'media-out', folderName, fileName + '.m3u8'))
      .on('start', (commandLine) => {
        this.logger.debug('Processing started for: ' + commandLine);
      })
      .on('end', () => {
        this.logger.debug('Processing ended');
        this.eventEmitter.emit(
          'ffmpeg.ended',
          new FfmpegEndedEvent({
            videoId,
            payload: {},
          }),
        );
      })
      .on('error', (err) => {
        this.logger.debug('Processing failed');
        this.eventEmitter.emit(
          'ffmpeg.error',
          new FfmpegErrorEvent({
            videoId,
            payload: err,
          }),
        );
      })
      .run();
  }

  @OnEvent('ffmpeg.ended')
  async handleFfmpegEndedEvent(/* event: FfmpegEndedEvent */) {
    this.logger.debug('ffmpeg.ended event received');
    // await this.vodsService.update(event.videoId, { status: 'PROCESSED' });
  }

  @OnEvent('ffmpeg.error')
  async handleFfmpegErrorEvent(event: FfmpegErrorEvent) {
    this.logger.debug('ffmpeg.error event received');
    this.logger.debug(event.payload);
    // await this.vodsService.update(event.videoId, { status: 'FAILED' });
  }
}
