import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  boardId: string | null;
}

const initialState: IState = {
  boardId: null,
};

const boardIdSlice = createSlice({
  name: 'boardId',
  initialState,
  reducers: {
    setBoardId: (state, action: PayloadAction<{ boardId: string | null }>) => {
      state.boardId = action.payload.boardId;
    },
  },
});

const { reducer: boardIdReducer, actions } = boardIdSlice;

const boardIdActions = {
  ...actions,
};

export { boardIdActions, boardIdReducer };
