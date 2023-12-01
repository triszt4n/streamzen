import { Controller, Get, Logger, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
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
    } else {
      this.logger.debug('Stream file: ' + folder + '/' + filename + '.' + ext);
    }

    const file = createReadStream(
      join(process.cwd(), 'media-out', folder, filename + '.' + ext),
    );
    return new StreamableFile(file);
  }
}
