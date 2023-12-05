import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { JwtAuth } from 'src/auth/decorator/jwt-auth.decorator';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}
  private readonly logger = new Logger(CollectionsController.name);

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
  @JwtAuth()
  async create(
    @Body() dto: CreateCollectionDto,
    @CurrentUser() user: User,
  ): Promise<Collection> {
    return this.collectionsService.create(dto, user);
  }

  @Post(':id/add')
  @JwtAuth()
  async addVod(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: { vodId: number },
  ): Promise<Collection> {
    return this.collectionsService.addVod(id, dto.vodId);
  }

  @Post(':id/bulk-add')
  @JwtAuth()
  async bulkAddVods(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: number[],
  ): Promise<Collection> {
    return this.collectionsService.addVods(id, dto);
  }

  @Put(':id')
  @JwtAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.update(id, dto);
  }

  @Delete(':id')
  @JwtAuth()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Collection> {
    return this.collectionsService.delete(id);
  }
}
