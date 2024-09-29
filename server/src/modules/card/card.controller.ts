import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  Put,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { CardEntity } from '../../database/entities/card.entity';
import { QueryCardDto } from './dto/query-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DeleteResult } from 'typeorm';
import { ResponseInterface } from '../../common/types/response.interface';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createCard(@Body() createCardDto: CreateCardDto): Promise<CardEntity> {
    return await this.cardService.createCard(createCardDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllCardsByBoardId(
    @Query() query: QueryCardDto,
  ): Promise<ResponseInterface<CardEntity>> {
    return await this.cardService.getAllCardsByBoardId(query);
  }

  @Get(':id')
  async getCardById(@Param('id') id: string): Promise<CardEntity> {
    return await this.cardService.getCardById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCard(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardEntity> {
    return await this.cardService.updateCard(id, updateCardDto);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<DeleteResult> {
    return await this.cardService.deleteCard(id);
  }
}
