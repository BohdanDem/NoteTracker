import { apiService, IRes } from './api.service';
import { urls } from '../constants/urls';
import { ResponseInterface } from '../../../server/src/common/types/response.interface';
import { IBoard } from '../interfaces/board.interface';

const boardService = {
  getAll: (page: number): IRes<ResponseInterface<IBoard>> =>
    apiService.get(urls.board.base, { params: { page } }),
  create: (data: IBoard): IRes<IBoard> =>
    apiService.post(urls.board.base, data),
  updateById: (id: string, data: Partial<IBoard>): IRes<IBoard> =>
    apiService.put(urls.board.byId(id), data),
  deleteById: (id: string): IRes<void> =>
    apiService.delete(urls.board.byId(id)),
};

export { boardService };
