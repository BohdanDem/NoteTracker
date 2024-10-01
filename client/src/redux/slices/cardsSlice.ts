import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ResponseInterface } from '../../../../server/src/common/types/response.interface';
import { ICard } from '../../interfaces/card.interface';
import { cardService } from '../../services/card.service';
import { CardStateEnum } from '../../constants/card.state.enum';

const initialState: ResponseInterface<ICard> = {
  limit: null,
  page: null,
  itemCount: null,
  itemCountPerPage: null,
  data: [],
};

const getAllCards = createAsyncThunk<
  ResponseInterface<ICard>,
  { boardId: string }
>('cardsSlice/getAllCards', async ({ boardId }, { rejectWithValue }) => {
  try {
    const { data } = await cardService.getAll(boardId);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    return rejectWithValue(err.response.data);
  }
});

const createCard = createAsyncThunk<void, { card: ICard }>(
  'cardsSlice/createCard',
  async ({ card }, { rejectWithValue }) => {
    try {
      await cardService.create(card);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const updateCard = createAsyncThunk<void, { id: string; card: ICard }>(
  'cardsSlice/updateCard',
  async ({ id, card }, { rejectWithValue }) => {
    try {
      await cardService.updateById(id, card);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const updateCardStateOrder = createAsyncThunk<
  void,
  { id: string; card: Partial<ICard> }
>(
  'cardsSlice/updateCardStateOrder',
  async ({ id, card }, { rejectWithValue }) => {
    try {
      await cardService.updateCardStateOrder(id, card);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const deleteCard = createAsyncThunk<void, { id: string }>(
  'cardsSlice/deleteCard',
  async ({ id }, { rejectWithValue }) => {
    try {
      await cardService.deleteById(id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    updateCardStateOrderLocal: (
      state,
      action: PayloadAction<{ id: string; state: string }>,
    ) => {
      const { id, state: newState } = action.payload;
      const updatedData = state.data.slice();
      const card = updatedData.find((card) => card.id === id);

      if (card) {
        updatedData
          .filter(
            (item) => item.state === card.state && item.order > card.order,
          )
          .forEach((item) => {
            item.order -= 1;
          });

        const cardsInNewStateCount = updatedData.filter(
          (item) => item.state === newState,
        ).length;

        card.state = newState as CardStateEnum;
        card.order = cardsInNewStateCount + 1;

        state.data = updatedData;
      }
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getAllCards.fulfilled, (state, action) => {
      state.limit = action.payload.limit;
      state.page = action.payload.page;
      state.itemCount = action.payload.itemCount;
      state.itemCountPerPage = action.payload.itemCountPerPage;
      state.data = action.payload.data;
    }),
});

const { reducer: cardsReducer, actions } = cardsSlice;

const cardsActions = {
  ...actions,
  getAllCards,
  createCard,
  updateCard,
  updateCardStateOrder,
  deleteCard,
};

export { cardsActions, cardsReducer };
