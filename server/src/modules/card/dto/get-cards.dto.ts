import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCardsDto {
  @IsNotEmpty()
  @IsUUID()
  readonly boardId: string;
}
