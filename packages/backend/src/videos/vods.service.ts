import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VodDto } from './dto/vod.dto';

@Injectable()
export class VodsService {
  constructor(private prismaService: PrismaService) {}

  async create({ path, mimetype, filename, title }: VodDto) {
    return this.prismaService.vod.create({
      data: {
        path,
        filename,
        mimetype,
        title,
      },
    });
  }

  async findAll() {
    return this.prismaService.vod.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.vod.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Partial<VodDto>) {
    return this.prismaService.vod.update({
      where: {
        id,
      },
      data,
    });
  }
}
