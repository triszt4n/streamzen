import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { User } from '@prisma/client';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private prismaService: PrismaService) {}
  private readonly logger = new Logger(CollectionsService.name);

  async findAll() {
    return this.prismaService.collection.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.collection.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        vods: true,
      },
    });
  }

  async create(dto: CreateCollectionDto, user: User) {
    const { title, descMarkdown } = dto;

    return this.prismaService.collection.create({
      data: {
        title,
        descMarkdown,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdateCollectionDto) {
    const { title, descMarkdown } = dto;

    return this.prismaService.collection.update({
      where: {
        id,
      },
      data: {
        title,
        descMarkdown,
      },
    });
  }

  async delete(id: number) {
    const collection = await this.prismaService.collection.delete({
      where: {
        id,
      },
    });
    return collection;
  }

  async addVod(collectionId: number, vodId: number) {
    return this.prismaService.vod.update({
      where: { id: vodId },
      data: {
        collection: {
          connect: {
            id: collectionId,
          },
        },
      },
    });
  }

  async addVods(collectionId: number, vodIds: number[]) {
    return this.prismaService.collection.update({
      where: { id: collectionId },
      data: {
        vods: {
          set: vodIds.map((id) => ({ id })),
        },
      },
    });
  }
}
