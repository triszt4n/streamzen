import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get('/:folder/:filename.:ext')
  getStream(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Param('ext') ext: string,
  ) {
    const file = createReadStream(
      join(process.cwd(), 'media-out', folder, filename + '.' + ext),
    );
    return new StreamableFile(file);
  }
}
