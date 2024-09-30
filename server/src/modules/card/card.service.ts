import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardEntity } from '../../database/entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CardStateEnum } from '../../common/enum/card.state.enum';
import { BoardEntity } from '../../database/entities/board.entity';
import { QueryCardDto } from './dto/query-card.dto';
import { findBoardByIdOrException } from '../../common/utils/board-utils';
import { UpdateCardDto } from './dto/update-card.dto';
import { ResponseInterface } from '../../common/types/response.interface';
import { UpdateCardStateOrderDto } from './dto/update-card-state-order.dto';

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
    const count = await this.cardRepository.count({
      where: {
        state: CardStateEnum['to do'],
        board: { id: createCardDto.boardId },
      },
    });

    card.board = await findBoardByIdOrException(
      this.boardRepository,
      createCardDto.boardId,
    );
    card.state = CardStateEnum['to do'];
    card.order = count + 1;
    Object.assign(card, createCardDto);

    return await this.cardRepository.save(card);
  }

  async getAllCardsByBoardId(
    query: QueryCardDto,
  ): Promise<ResponseInterface<CardEntity>> {
    const queryBuilder = this.dataSource
      .getRepository(CardEntity)
      .createQueryBuilder('card');

    const offset = query.page - 1;

    queryBuilder.where('card.boardId = :boardId', {
      boardId: query.boardId,
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
      itemCount: cardCount,
      itemCountPerPage: cardCountPerPage,
      data: cards,
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

  async updateCardStateOrder(
    id: string,
    updateCardStateOrderDto: UpdateCardStateOrderDto,
  ): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['board'],
    });
    if (!card) {
      throw new UnprocessableEntityException('Card not found');
    }

    if (updateCardStateOrderDto.state !== card.state) {
      const cardsInNewStateCount = await this.cardRepository.count({
        where: {
          board: { id: card.board.id },
          state: updateCardStateOrderDto.state,
        },
      });
      card.order = cardsInNewStateCount + 1;

      await this.cardRepository
        .createQueryBuilder()
        .update(CardEntity)
        .set({ order: () => '"order" - 1' })
        .where('boardId = :boardId', { boardId: card.board.id })
        .andWhere('state = :state', { state: card.state })
        .andWhere('"order" > :order', { order: card.order })
        .execute();
    }

    this.cardRepository.merge(card, updateCardStateOrderDto);

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
