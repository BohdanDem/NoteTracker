import { configureStore } from '@reduxjs/toolkit';
import { boardsReducer } from './slices/boardsSlice';
import { boardForUpdateReducer } from './slices/boardForUpdateSlice';
import { cardsReducer } from './slices/cardsSlice';
import { boardIdReducer } from './slices/boardIdSlice';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    cards: cardsReducer,
    boardForUpdate: boardForUpdateReducer,
    boardId: boardIdReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { store };
