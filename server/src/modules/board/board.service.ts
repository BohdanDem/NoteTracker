import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { BoardEntity } from '../../database/entities/board.entity';
import { BoardsResponseInterface } from './types/boardsResponse.interface';
import { QueryBoardDto } from './dto/query-board.dto';
import { findBoardByIdOrException } from '../../common/utils/board-utils';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    private dataSource: DataSource,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const board = new BoardEntity();
    Object.assign(board, createBoardDto);
    return await this.boardRepository.save(board);
  }

  async getAllBoards(query: QueryBoardDto): Promise<BoardsResponseInterface> {
    const queryBuilder = this.dataSource
      .getRepository(BoardEntity)
      .createQueryBuilder('board');
    // .leftJoinAndSelect('board.cards', 'cards');

    const offset = query.page - 1;

    queryBuilder.limit(query.limit);
    queryBuilder.offset(offset * query.limit);
    queryBuilder.orderBy('board.createdAt', 'DESC');

    const boards = await queryBuilder.getMany();
    const boardCount = await queryBuilder.getCount();
    const boardCountPerPage = boards.length;

    return {
      limit: query.limit,
      page: query.page,
      boardCount,
      boardCountPerPage,
      boards,
    };
  }

  async getBoardById(id: string): Promise<BoardEntity> {
    return await findBoardByIdOrException(this.boardRepository, id);
  }

  async updateBoard(
    id: string,
    updateBoardDto: CreateBoardDto,
  ): Promise<BoardEntity> {
    const board = await findBoardByIdOrException(this.boardRepository, id);
    this.boardRepository.merge(board, updateBoardDto);
    return await this.boardRepository.save(board);
  }

  async deleteBoard(id: string): Promise<DeleteResult> {
    const board = await findBoardByIdOrException(this.boardRepository, id);
    return await this.boardRepository.delete(board.id);
  }
}
