import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CardStateEnum } from '../../../../../shared/enum/card.state.enum';

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

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(CardStateEnum)
  readonly state: CardStateEnum;
}
