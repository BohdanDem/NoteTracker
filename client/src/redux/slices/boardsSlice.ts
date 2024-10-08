import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ResponseInterface } from '../../../../server/src/common/types/response.interface';
import { IBoard } from '../../interfaces/board.interface';
import { boardService } from '../../services/board.service';

const initialState: ResponseInterface<IBoard> = {
  limit: null,
  page: null,
  itemCount: null,
  itemCountPerPage: null,
  data: [],
};

const getAllBoards = createAsyncThunk<
  ResponseInterface<IBoard>,
  { page: number }
>('boardsSlice/getAllBoards', async ({ page }, { rejectWithValue }) => {
  try {
    const { data } = await boardService.getAll(page);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    return rejectWithValue(err.response.data);
  }
});

const createBoard = createAsyncThunk<void, { board: IBoard }>(
  'boardsSlice/createBoard',
  async ({ board }, { rejectWithValue }) => {
    try {
      await boardService.create(board);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const updateBoard = createAsyncThunk<void, { id: string; board: IBoard }>(
  'boardsSlice/updateBoard',
  async ({ id, board }, { rejectWithValue }) => {
    try {
      await boardService.updateById(id, board);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const deleteBoard = createAsyncThunk<void, { id: string }>(
  'boardsSlice/deleteBoard',
  async ({ id }, { rejectWithValue }) => {
    try {
      await boardService.deleteById(id);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const boardsSlice = createSlice({
  name: 'boardsSlice',
  initialState,
  reducers: {
    setNewPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getAllBoards.fulfilled, (state, action) => {
      state.limit = action.payload.limit;
      state.page = action.payload.page;
      state.itemCount = action.payload.itemCount;
      state.itemCountPerPage = action.payload.itemCountPerPage;
      state.data = action.payload.data;
    }),
});

const { reducer: boardsReducer, actions } = boardsSlice;

const boardsActions = {
  ...actions,
  getAllBoards,
  createBoard,
  deleteBoard,
  updateBoard,
};

export { boardsActions, boardsReducer };
