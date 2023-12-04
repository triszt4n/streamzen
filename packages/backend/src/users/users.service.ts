import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '@prisma/client';
import { CaslAbilityFactory } from 'src/auth/casl-ability.factory';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly caslFactory: CaslAbilityFactory,
  ) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async profile(oldUser: User) {
    const user = await this.prisma.user.findUnique({
      where: { id: oldUser.id },
    });
    return {
      ...user,
      jwt:
        user.role !== oldUser.role
          ? this.jwtService.sign(user, {
              secret: process.env.JWT_SECRET,
              expiresIn: '2 days',
            })
          : undefined,
    };
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async findByAuthSchId(authSchId: string) {
    return this.prisma.user.findUnique({ where: { authSchId: authSchId } });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ data, where: { id: id } });
  }

  async promoteUser(id: number, role: UserRole) {
    return this.prisma.user.update({
      data: { role },
      where: { id: id },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }

  async findAllVideosCreatedByUser(user: User) {
    return this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        createdVods: true,
        createdLives: true,
        createdCollections: true,
      },
    });
  }
}
