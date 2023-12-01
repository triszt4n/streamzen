import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLiveDto } from '../dto/create-live.dto';
import { UpdateLiveDto } from '../dto/update-live.dto';

@Injectable()
export class LivesService {
  constructor(private prismaService: PrismaService) {}
  private readonly logger = new Logger(LivesService.name);

  async findAll() {
    return this.prismaService.live.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.live.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async create(dto: CreateLiveDto, user: User) {
    const { title, descMarkdown, airDate, liveType, embedUrl, state } = dto;
    return this.prismaService.live.create({
      data: {
        title,
        descMarkdown,
        airDate,
        liveType,
        embedUrl,
        state,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdateLiveDto) {
    const { title, descMarkdown, airDate, embedUrl, state } = dto;
    return this.prismaService.live.update({
      where: {
        id,
      },
      data: {
        title,
        descMarkdown,
        airDate,
        embedUrl,
        state,
      },
    });
  }

  async delete(id: number) {
    return this.prismaService.live.delete({
      where: {
        id,
      },
    });
  }
}
