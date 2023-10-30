import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VideosModule } from './videos/videos.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [VideosModule, ConfigModule.forRoot(), PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
