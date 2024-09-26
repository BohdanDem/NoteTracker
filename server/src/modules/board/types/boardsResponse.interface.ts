import { BoardEntity } from '../../../database/entities/board.entity';

export interface BoardsResponseInterface {
  limit: number;
  page: number;
  boardCount: number;
  boardCountPerPage: number;
  boards: BoardEntity[];
}
