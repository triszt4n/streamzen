import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVodDto } from '../dto/create-vod.dto';
import { ProcessState, User } from '@prisma/client';
import { UpdateVodDto } from '../dto/update-vod.dto';

@Injectable()
export class VodsService {
  constructor(private prismaService: PrismaService) {}
  private readonly logger = new Logger(VodsService.name);

  async create(dto: CreateVodDto, user: User) {
    const { title, descMarkdown, originalDate, folderName, fileName, ext } =
      dto;
    return this.prismaService.vod.create({
      data: {
        title,
        descMarkdown,
        originalDate: new Date(originalDate).toISOString(),
        folderName,
        fileName,
        ext,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.vod.findMany({ include: { createdBy: true } });
  }

  async findAllProcessed() {
    return this.prismaService.vod.findMany({
      where: {
        state: ProcessState.PROCESSED,
      },
    });
  }

  async findAllFolderNames() {
    return this.prismaService.vod.findMany({ select: { folderName: true } });
  }

  async findOne(id: number) {
    return this.prismaService.vod.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateVodDto) {
    const { title, descMarkdown, originalDate } = dto;
    return this.prismaService.vod.update({
      where: {
        id,
      },
      data: {
        title,
        descMarkdown,
        originalDate: originalDate && originalDate.toISOString(),
      },
    });
  }

  async updateState(id: number, newState: ProcessState) {
    return this.prismaService.vod.update({
      where: {
        id,
      },
      data: {
        state: newState,
      },
    });
  }

  async delete(id: number) {
    const vod = await this.prismaService.vod.delete({
      where: {
        id,
      },
    });
    return vod;
  }
}
