import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly title: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly description: string;
}
