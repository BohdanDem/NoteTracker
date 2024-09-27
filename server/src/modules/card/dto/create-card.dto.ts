import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly title: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly description: string;

  @IsNotEmpty()
  @IsUUID()
  readonly boardId: string;
}
