import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardEntity } from '../../database/entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CardStateEnum } from '../../common/enum/card.state.enum';
import { BoardEntity } from '../../database/entities/board.entity';
import { QueryCardDto } from './dto/query-card.dto';
import { CardsResponseInterface } from './types/cardsResponse.interface';
import { findBoardByIdOrException } from '../../common/utils/board-utils';
import { GetCardsDto } from './dto/get-cards.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,

    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    private dataSource: DataSource,
  ) {}

  async createCard(createCardDto: CreateCardDto): Promise<CardEntity> {
    const card = new CardEntity();

    card.board = await findBoardByIdOrException(
      this.boardRepository,
      createCardDto.boardId,
    );
    card.state = CardStateEnum['to do'];
    Object.assign(card, createCardDto);

    return await this.cardRepository.save(card);
  }

  async getAllCardsByBoardId(
    query: QueryCardDto,
    getCardsDto: GetCardsDto,
  ): Promise<CardsResponseInterface> {
    const queryBuilder = this.dataSource
      .getRepository(CardEntity)
      .createQueryBuilder('card');

    const offset = query.page - 1;

    queryBuilder.where('card.boardId = :boardId', {
      boardId: getCardsDto.boardId,
    });
    queryBuilder.limit(query.limit);
    queryBuilder.offset(offset * query.limit);
    queryBuilder.orderBy('card.createdAt', 'DESC');

    const cards = await queryBuilder.getMany();
    const cardCount = await queryBuilder.getCount();
    const cardCountPerPage = cards.length;

    return {
      limit: query.limit,
      page: query.page,
      cardCount,
      cardCountPerPage,
      cards,
    };
  }

  async getCardById(id: string): Promise<CardEntity> {
    return await this.findCardByIdOrException(id);
  }

  async updateCard(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardEntity> {
    const card = await this.findCardByIdOrException(id);
    this.cardRepository.merge(card, updateCardDto);
    return await this.cardRepository.save(card);
  }

  async deleteCard(id: string): Promise<DeleteResult> {
    const card = await this.findCardByIdOrException(id);
    return await this.cardRepository.delete(card.id);
  }

  private async findCardByIdOrException(id: string): Promise<CardEntity> {
    const card = await this.cardRepository.findOneBy({ id });
    if (!card) {
      throw new UnprocessableEntityException('Card not found');
    }
    return card;
  }
}
