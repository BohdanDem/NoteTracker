import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
  Put,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardService } from './board.service';
import { BoardEntity } from '../../database/entities/board.entity';
import { QueryBoardDto } from './dto/query-board.dto';
import { DeleteResult } from 'typeorm';
import { ResponseInterface } from '../../../../shared/types/response.interface';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<BoardEntity> {
    return await this.boardService.createBoard(createBoardDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllBoards(
    @Query() query: QueryBoardDto,
  ): Promise<ResponseInterface<BoardEntity>> {
    return await this.boardService.getAllBoards(query);
  }

  @Get(':id')
  async getBoardById(@Param('id') id: string): Promise<BoardEntity> {
    return await this.boardService.getBoardById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoardDto: CreateBoardDto,
  ): Promise<BoardEntity> {
    return await this.boardService.updateBoard(id, updateBoardDto);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string): Promise<DeleteResult> {
    return await this.boardService.deleteBoard(id);
  }
}
