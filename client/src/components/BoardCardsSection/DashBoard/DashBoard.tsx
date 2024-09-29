import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { cardsActions } from '../../../redux/slices/cardsSlice';
import { ICard } from '../../../interfaces/card.interface';
import styles from './DashBoard.module.css';
import Card from './Card/Card';

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.cards);
  const { boardId } = useAppSelector((state) => state.boardId);

  useEffect(() => {
    const boardId = localStorage.getItem('boardId');

    if (boardId) {
      dispatch(cardsActions.getAllCards({ boardId }));
    }
  }, [boardId]);

  const todoCards: ICard[] = data.filter(
    (card: ICard) => card.state === 'to do',
  );
  const inProgressCards: ICard[] = data.filter(
    (card: ICard) => card.state === 'in progress',
  );
  const doneCards: ICard[] = data.filter(
    (card: ICard) => card.state === 'done',
  );

  return (
    <div className={styles.main}>
      {data.length > 0 ? (
        <>
          <div className={styles.column}>
            {todoCards.map((card: ICard) => (
              <Card card={card} />
            ))}
          </div>
          <div className={styles.column}>
            {inProgressCards.map((card: ICard) => (
              <Card card={card} />
            ))}
          </div>
          <div className={styles.column}>
            {doneCards.map((card: ICard) => (
              <Card card={card} />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.empty}>No cards available in this board</div>
      )}
    </div>
  );
};

export default DashBoard;
