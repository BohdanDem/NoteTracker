import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

const getAllBoards = createAsyncThunk<ResponseInterface<IBoard>>(
  'boardsSlice/getAllBoards',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await boardService.getAll();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

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

// const updateTodo = createAsyncThunk<void, { id: string; todo: ITodoCreate }>(
//   'todosSlice/updateTodo',
//   async ({ id, todo }, { rejectWithValue }) => {
//     try {
//       await todoService.updateById(id, todo);
//     } catch (e) {
//       const err = e as AxiosError;
//       return rejectWithValue(err.response.data);
//     }
//   },
// );
//
// const deleteTodo = createAsyncThunk<void, { id: string }>(
//   'todosSlice/deleteTodo',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       await todoService.deleteById(id);
//     } catch (e) {
//       const err = e as AxiosError;
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

const boardsSlice = createSlice({
  name: 'boardsSlice',
  initialState,
  reducers: {},
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
};

export { boardsActions, boardsReducer };
