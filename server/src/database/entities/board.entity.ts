import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CardEntity } from './card.entity';

@Entity({ name: 'board' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => CardEntity, (cards) => cards.board, { cascade: true })
  cards: CardEntity[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
