import { LiveState } from '@prisma/client';
import { IsDate, IsEnum, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateLiveDto {
  @IsString()
  @MinLength(3)
  title?: string;

  @IsString()
  // @MaxLength(1000)
  descMarkdown?: string;

  @IsDate()
  airDate?: Date;

  @IsString()
  @IsUrl()
  embedUrl?: string;

  @IsEnum(LiveState)
  state?: LiveState;

  // todo: contributing users
}
