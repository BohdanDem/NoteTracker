import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CardStateEnum } from '../../../common/enum/card.state.enum';

export class UpdateCardStateOrderDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(CardStateEnum)
  readonly state: CardStateEnum;

  @IsOptional()
  @IsNotEmpty()
  readonly order: number;
}
