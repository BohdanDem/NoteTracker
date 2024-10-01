import React, { FC, PropsWithChildren } from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './Card.module.css';
import { ReactComponent as UpdateIcon } from '../../../../images/update.svg';
import { ReactComponent as BasketIcon } from '../../../../images/basket.svg';
import { ICard } from '../../../../interfaces/card.interface';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { modalStateActions } from '../../../../redux/slices/modalStateSlice';
import { cardForUpdateActions } from '../../../../redux/slices/cardForUpdateSlice';
import { cardsActions } from '../../../../redux/slices/cardsSlice';

interface IProps extends PropsWithChildren {
  card: ICard;
  index: number;
  columnName: string;
}

const Card: FC<IProps> = ({ card, index, columnName }) => {
  const { title, description, id } = card;
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(modalStateActions.setModalActive({ state: true }));
    dispatch(cardForUpdateActions.setCardForUpdate({ card }));
  };

  const deleteCard = async () => {
    const boardId = localStorage.getItem('boardId');
    await dispatch(cardsActions.deleteCard({ id }));
    await dispatch(cardsActions.getAllCards({ boardId }));
  };

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
    data: { index, columnName },
  });

  return (
    <div
      ref={setNodeRef}
      className={styles.card}
      {...listeners}
      {...attributes}
    >
      <div>
        <b>{title}</b>
      </div>
      <div>{description}</div>
      <div className={styles.icons}>
        <UpdateIcon
          onClick={openModal}
          className={styles.icon}
          width={30}
          height={30}
        />
        <BasketIcon
          onClick={deleteCard}
          className={styles.icon}
          width={25}
          height={25}
        />
      </div>
    </div>
  );
};

export default Card;
