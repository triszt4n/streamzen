import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LivesService } from './lives.service';
import { ProcessingService } from './processing.service';
import { VideosController } from './videos.controller';
import { VodsService } from './vods.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [VideosController],
  providers: [VodsService, LivesService, ProcessingService],
})
export class VideosModule {}
