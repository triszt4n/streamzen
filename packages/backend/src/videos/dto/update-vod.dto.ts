import { IsDate, IsString, MinLength } from 'class-validator';

export class UpdateVodDto {
  @IsString()
  @MinLength(3)
  title?: string;

  @IsString()
  // @MaxLength(1000)
  descMarkdown?: string;

  @IsDate()
  originalDate?: Date;

  // todo: contributing users
}
