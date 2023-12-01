import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsUUID('all')
  authSchId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;
}
