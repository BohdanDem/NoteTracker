import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CardStateEnum } from '../../common/enum/card.state.enum';
import { BoardEntity } from './board.entity';

@Entity({ name: 'card' })
export class CardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: CardStateEnum })
  state: CardStateEnum;

  @ManyToOne(() => BoardEntity, (board) => board.cards)
  board: BoardEntity;
}
