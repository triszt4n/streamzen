import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateVodDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  // @MaxLength(1000)
  descMarkdown: string;

  @IsNotEmpty()
  originalDate: Date;

  @IsString()
  @IsLowercase()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug must be lowercase alphanumeric with dashes',
  })
  folderName: string;

  @IsString()
  @IsLowercase()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug must be lowercase alphanumeric with dashes',
  })
  fileName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  @Matches(/^[a-z0-9]+$/, {
    message: 'extension must be lowercase alphanumeric (no dots)',
  })
  ext: string;

  // todo: contributing users
}
