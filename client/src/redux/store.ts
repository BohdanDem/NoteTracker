import { configureStore } from '@reduxjs/toolkit';
import { boardsReducer } from './slices/boardsSlice';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { store };
