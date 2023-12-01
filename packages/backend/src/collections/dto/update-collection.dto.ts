import { IsString, MinLength } from 'class-validator';

export class UpdateCollectionDto {
  @IsString()
  @MinLength(3)
  title?: string;

  @IsString()
  // @MaxLength(1000)
  descMarkdown?: string;
}
