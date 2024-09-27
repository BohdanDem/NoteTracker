import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from '../../database/entities/card.entity';
import { BoardEntity } from '../../database/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, BoardEntity])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
