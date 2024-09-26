import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly name: string;
}
