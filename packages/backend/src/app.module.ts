import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { StreamModule } from './stream/stream.module';
import { VideosModule } from './videos/videos.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    VideosModule,
    ConfigModule.forRoot(),
    PrismaModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        FRONTEND_HOST: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        FFMPEG_PATH: Joi.string().required(),
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
        AUTHSCH_HOST: Joi.string().uri().required(),
        AUTHSCH_CLIENT_ID: Joi.string().required(),
        AUTHSCH_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    StreamModule,
    CollectionsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
