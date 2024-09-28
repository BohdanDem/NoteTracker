import { CardStateEnum } from '../../../server/src/common/enum/card.state.enum';

export interface ICard {
  id?: string;
  title: string;
  description: string;
  state: CardStateEnum;
}
