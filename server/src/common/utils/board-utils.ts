import { Repository } from 'typeorm';
import { BoardEntity } from '../../database/entities/board.entity';
import { UnprocessableEntityException } from '@nestjs/common';

export async function findBoardByIdOrException(
  boardRepository: Repository<BoardEntity>,
  id: string,
): Promise<BoardEntity> {
  const board = await boardRepository.findOneBy({ id });
  if (!board) {
    throw new UnprocessableEntityException('Board not found');
  }
  return board;
}
