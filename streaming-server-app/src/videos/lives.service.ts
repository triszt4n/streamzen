import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
