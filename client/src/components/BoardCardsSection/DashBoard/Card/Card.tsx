import React, { FC, PropsWithChildren } from 'react';
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
}

const Card: FC<IProps> = ({ card }) => {
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('cardId', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={styles.card} draggable onDragStart={handleDragStart}>
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
