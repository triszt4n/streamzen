import { Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export type AppSubjects = Subjects<{
  User: User;
}>;

// type AppAbility = PureAbility<[string, AppSubjects], PrismaQuery>;

export enum Permissions {
  Manage = 'manage', // all permissions
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  PromoteUser = 'promote_user',
  DownloadFile = 'download_file',
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private prisma: PrismaService) {}
}
