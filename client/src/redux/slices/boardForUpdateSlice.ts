import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces/board.interface';

interface IState {
  boardForUpdate: IBoard | null;
}

const initialState: IState = {
  boardForUpdate: null,
};

const boardForUpdateSlice = createSlice({
  name: 'boardForUpdate',
  initialState,
  reducers: {
    setBoardForUpdate: (
      state,
      action: PayloadAction<{ board: IBoard | null }>,
    ) => {
      state.boardForUpdate = action.payload.board;
    },
  },
});

const { reducer: boardForUpdateReducer, actions } = boardForUpdateSlice;

const boardForUpdateActions = {
  ...actions,
};

export { boardForUpdateActions, boardForUpdateReducer };
