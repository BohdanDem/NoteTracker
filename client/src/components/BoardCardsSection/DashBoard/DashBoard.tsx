import React, { useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { cardsActions } from '../../../redux/slices/cardsSlice';
import { ICard } from '../../../interfaces/card.interface';
import styles from './DashBoard.module.css';
import Card from './Card/Card';
import CardForm from './CardForm/CardForm';
import { boardIdActions } from '../../../redux/slices/boardIdSlice';
import { CardStateEnum } from '../../../constants/card.state.enum';
import { DroppableColumn } from './DroppableColumn/DroppableColumn';
import AddCard from './AddCard/AddCard';

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const cardId = active.id as string;
      const newState = over.id as CardStateEnum;
      const card = data.find((card) => card.id === cardId);

      if (card && card.state !== newState) {
        dispatch(
          cardsActions.updateCardStateOrderLocal({
            id: cardId,
            state: newState,
          }),
        );
        const updatedCard = {
          state: newState as CardStateEnum,
        };
        dispatch(
          cardsActions.updateCardStateOrder({
            id: cardId,
            card: updatedCard,
          }),
        );
      }
    }

    setActiveCard(null);
  };

  const handleDragStart = (event: any) => {
    const cardId = event.active.id as string;
    const card = data.find((card) => card.id === cardId);
    if (card) {
      setActiveCard(card);
    }
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className={styles.main}>
        {boardId ? (
          data.length > 0 ? (
            <>
              <DroppableColumn id={CardStateEnum['to do']} />
              <DroppableColumn id={CardStateEnum['in progress']} />
              <DroppableColumn id={CardStateEnum.done} />
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

      <DragOverlay>
        {activeCard ? (
          <Card
            card={activeCard}
            index={0}
            columnName={activeCard.state as string}
          />
        ) : null}
      </DragOverlay>

      {error && <span className={styles.error}>{error}</span>}
    </DndContext>
  );
};

export default DashBoard;
