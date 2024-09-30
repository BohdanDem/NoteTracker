import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { cardsActions } from '../../../redux/slices/cardsSlice';
import { ICard } from '../../../interfaces/card.interface';
import styles from './DashBoard.module.css';
import Card from './Card/Card';
import AddCard from './AddCard/AddCard';
import CardForm from './CardForm/CardForm';
import { boardIdActions } from '../../../redux/slices/boardIdSlice';

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const { data } = useAppSelector((state) => state.cards);
  const { boardId } = useAppSelector((state) => state.boardId);

  useEffect(() => {
    const boardId = localStorage.getItem('boardId');

    if (boardId) {
      dispatch(boardIdActions.setBoardId({ boardId }));
      dispatch(cardsActions.getAllCards({ boardId }));
    }
  }, [boardId]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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
    <>
      <div className={styles.main}>
        {boardId ? (
          data.length > 0 ? (
            <>
              <div className={styles.column}>
                <h3>To Do</h3>
                <AddCard />
                <div className={styles.wrapper}>
                  {todoCards.map((card: ICard) => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>
              <div className={styles.column}>
                <h3>In Progress</h3>
                <div className={styles.wrapper}>
                  {inProgressCards.map((card: ICard) => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>
              <div className={styles.column}>
                <h3>Done</h3>
                <div className={styles.wrapper}>
                  {doneCards.map((card: ICard) => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <div>No cards available in this board</div>
              <AddCard />
            </div>
          )
        ) : null}
        <CardForm setResponseError={setError} />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </>
  );
};

export default DashBoard;
