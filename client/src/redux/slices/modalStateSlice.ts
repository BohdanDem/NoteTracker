import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isModalActive: boolean;
}

const initialState: IState = {
  isModalActive: false,
};

const modalStateSlice = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    setModalActive: (state, action: PayloadAction<{ state: boolean }>) => {
      state.isModalActive = action.payload.state;
    },
  },
});

const { reducer: modalStateReducer, actions } = modalStateSlice;

const modalStateActions = {
  ...actions,
};

export { modalStateActions, modalStateReducer };
