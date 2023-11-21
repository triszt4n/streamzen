import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import NodeMediaServer from 'node-media-server';
import { join } from 'path';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}
  private readonly logger = new Logger(StreamController.name);

  @Get('/:folder/:filename.:ext')
  getStream(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Param('ext') ext: string,
  ) {
    if (ext === 'm3u8') {
      this.logger.debug('Started a stream: ' + folder + '/' + filename);
    }

    const file = createReadStream(
      join(process.cwd(), 'media-out', folder, filename + '.' + ext),
    );
    return new StreamableFile(file);
  }

  @Post('/live/new')
  async liveStream() {
    const config = {
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
      },
      http: {
        port: 8000,
        mediaroot: './media',
        allow_origin: '*',
      },
      trans: {
        ffmpeg: '/usr/local/bin/ffmpeg',
        tasks: [
          {
            app: 'live',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            hlsKeep: true, // to prevent hls file delete after end the stream
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
            dashKeep: true, // to prevent dash file delete after end the stream
          },
        ],
      },
    };

    const nms = new NodeMediaServer(config);
    nms.run();
  }
}
