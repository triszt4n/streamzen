import { User, UserRole } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class JwtUserDto implements User {
  id: number;
  authSchId: string;
  fullName: string;
  firstName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  @IsNotEmpty()
  iat: number;

  @IsNotEmpty()
  exp: number;
}
