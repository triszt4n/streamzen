import { Get, Redirect, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { JwtAuth } from './decorator/jwt-auth.decorator';
import { JwtUserDto } from './dto/jwtUser.dto';
import { ApiController } from 'src/utils/api-controller.decorator';
import { ConfigService } from '@nestjs/config';

@ApiController('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('authsch'))
  @Get('login')
  login() {}

  @Get('callback')
  @UseGuards(AuthGuard('authsch'))
  @Redirect()
  oauthRedirect(@CurrentUser() user: User) {
    const { jwt } = this.authService.login(user);
    return {
      url: `${this.configService.get('FRONTEND_HOST')}/welcome?jwt=${jwt}`,
    };
  }

  @Get('me')
  @JwtAuth()
  me(@CurrentUser() user: JwtUserDto): JwtUserDto {
    return user;
  }
}
