import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LivesService } from './services/lives.service';
import { ProcessingService } from './services/processing.service';
import { VideosController } from './videos.controller';
import { VodsService } from './services/vods.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [PrismaModule, ConfigModule, CacheModule],
  controllers: [VideosController],
  providers: [VodsService, LivesService, ProcessingService],
})
export class VideosModule {}
