import React from 'react';
import FindBoardForm from './FindBoardForm/FindBoardForm';
import DashBoard from './DashBoard/DashBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const BoardCardsSection = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <FindBoardForm />
      <DashBoard />
    </DndProvider>
  );
};

export default BoardCardsSection;
