import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
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

  @Column()
  order: number;

  @ManyToOne(() => BoardEntity, (board) => board.cards, { onDelete: 'CASCADE' })
  board: BoardEntity;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
