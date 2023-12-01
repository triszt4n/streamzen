import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  // @MaxLength(1000)
  descMarkdown: string;
}
