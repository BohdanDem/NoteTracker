import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../interfaces/card.interface';

interface IState {
  cardForUpdate: ICard | null;
}

const initialState: IState = {
  cardForUpdate: null,
};

const cardForUpdateSlice = createSlice({
  name: 'cardForUpdate',
  initialState,
  reducers: {
    setCardForUpdate: (
      state,
      action: PayloadAction<{ card: ICard | null }>,
    ) => {
      state.cardForUpdate = action.payload.card;
    },
  },
});

const { reducer: cardForUpdateReducer, actions } = cardForUpdateSlice;

const cardForUpdateActions = {
  ...actions,
};

export { cardForUpdateActions, cardForUpdateReducer };
