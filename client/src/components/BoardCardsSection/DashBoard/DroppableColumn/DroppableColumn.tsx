import React, { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './DroppableColumn.module.css';
import { ICard } from '../../../../interfaces/card.interface';
import Card from '../Card/Card';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { CardStateEnum } from '../../../../constants/card.state.enum';
import AddCard from '../AddCard/AddCard';

interface DroppableColumnProps {
  id: string;
}

const DroppableColumn: FC<DroppableColumnProps> = ({ id }) => {
  const { setNodeRef } = useDroppable({ id });
  const { data } = useAppSelector((state) => state.cards);
  const cardsState = id;
  const title =
    id === CardStateEnum['to do']
      ? 'To Do'
      : id === CardStateEnum['in progress']
        ? 'In Progress'
        : 'Done';

  const cards: ICard[] = data
    .filter((card: ICard) => card.state === cardsState)
    .sort((a, b) => b.order - a.order);

  return (
    <div ref={setNodeRef} className={styles.column}>
      <h3>{title}</h3>
      {id === CardStateEnum['to do'] && <AddCard />}
      <div className={styles.wrapper}>
        {cards.map((card: ICard, index: number) => (
          <Card key={card.id} card={card} index={index} columnName={id} />
        ))}
      </div>
    </div>
  );
};

export { DroppableColumn };
