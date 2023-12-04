import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { CollectionsModule } from 'src/collections/collections.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LivesService } from './services/lives.service';
import { ProcessingService } from './services/processing.service';
import { VodsService } from './services/vods.service';
import { VideosController } from './videos.controller';

@Module({
  imports: [
    CacheModule.register(),
    PrismaModule,
    ConfigModule,
    AuthModule,
    CollectionsModule,
  ],
  controllers: [VideosController],
  providers: [VodsService, LivesService, ProcessingService],
})
export class VideosModule {}
