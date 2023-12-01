import { LiveState, LiveType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateLiveDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  // @MaxLength(1000)
  descMarkdown: string;

  @IsDate()
  @IsNotEmpty()
  airDate: Date;

  @IsEnum(LiveType)
  @IsNotEmpty()
  liveType: LiveType;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ValidateIf((o) => o.liveType !== LiveType.LOCAL_RTMP)
  embedUrl?: string;

  @IsEnum(LiveState)
  state?: LiveState;

  // todo: contributing users
}
