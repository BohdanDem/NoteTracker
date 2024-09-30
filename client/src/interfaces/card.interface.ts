import { CardStateEnum } from '../constants/card.state.enum';

export interface ICard {
  id?: string;
  title: string;
  description: string;
  state: CardStateEnum;
  order: number;
}
