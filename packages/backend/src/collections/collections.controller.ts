import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection, User, Vod } from '@prisma/client';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll(): Promise<Collection[]> {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Collection & { vods: Vod[] }> {
    return this.collectionsService.findOne(id);
  }

  @Post()
  async create(
    @Body() dto: CreateCollectionDto,
    @CurrentUser() user: User,
  ): Promise<Collection> {
    return this.collectionsService.create(dto, user);
  }

  @Post(':id/add')
  async addVod(
    @Param('id', ParseIntPipe) id: number,
    @Body('vodId') dto: { vodId: number },
  ): Promise<Collection> {
    return this.collectionsService.addVod(id, dto.vodId);
  }

  @Post(':id/bulk-add')
  async bulkAddVods(
    @Param('id', ParseIntPipe) id: number,
    @Body('vodId') dto: number[],
  ): Promise<Collection> {
    return this.collectionsService.addVods(id, dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Collection> {
    return this.collectionsService.delete(id);
  }
}
