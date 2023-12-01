import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-oauth2';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { OAuthUser } from './oauthuser';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthschStrategy extends PassportStrategy(Strategy, 'authsch') {
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    const host = configService.get('AUTHSCH_HOST');
    super({
      authorizationURL: `${host}/site/login`,
      tokenURL: `${host}/oauth2/token`,
      clientID: configService.get('AUTHSCH_CLIENT_ID'),
      clientSecret: configService.get('AUTHSCH_CLIENT_SECRET'),
      scope: ['basic', 'givenName', 'displayName', 'mail'],
    });
    this.host = host;
  }

  private readonly logger = new Logger(AuthschStrategy.name);
  private host: string;

  async validate(accessToken: string): Promise<User> {
    const { data: oAuthUser } = await firstValueFrom(
      this.httpService.get<OAuthUser>(
        `${this.host}/api/profile?access_token=${accessToken}`,
      ),
    );
    const dbUser = await this.authService.findOrCreateUser(oAuthUser);
    this.logger.debug('DbUser in validate' + JSON.stringify(dbUser, null, 2));
    return dbUser;
  }
}
