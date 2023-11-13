import { Module } from '@nestjs/common';
import { VideosModule } from 'src/videos/videos.module';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';

@Module({
  imports: [VideosModule],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
