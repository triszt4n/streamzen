import {
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthorizationSubject } from 'src/auth/decorator/authorization-subject.decorator';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuth } from 'src/auth/decorator/jwt-auth.decorator';
import { ApiController } from 'src/utils/api-controller.decorator';
import { UsersService } from './users.service';

@JwtAuth()
@AuthorizationSubject('User')
@ApiController('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  async findProfile(@CurrentUser() user: User) {
    return this.usersService.profile(user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post(':id/promote')
  // @RequiredPermission(Permissions.PromoteUser)
  async promote(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.promoteUser(id, 'ADMIN');
    } catch {
      throw new NotFoundException('A felhasználó nem található!');
    }
  }

  @Delete(':id')
  // @RequiredPermission(Permissions.Delete)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.remove(id);
    } catch {
      throw new NotFoundException('A felhasználó nem található!');
    }
  }
}
