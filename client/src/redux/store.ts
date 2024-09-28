import { configureStore } from '@reduxjs/toolkit';
import { boardsReducer } from './slices/boardsSlice';
import { boardForUpdateReducer } from './slices/boardForUpdateSlice';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    boardForUpdate: boardForUpdateReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { store };
