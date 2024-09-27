import { CardEntity } from '../../../database/entities/card.entity';

export interface CardsResponseInterface {
  limit: number;
  page: number;
  cardCount: number;
  cardCountPerPage: number;
  cards: CardEntity[];
}
