import { apiService, IRes } from './api.service';
import { urls } from '../constants/urls';
import { ResponseInterface } from '../../../server/src/common/types/response.interface';
import { ICard } from '../interfaces/card.interface';

const cardService = {
  getAll: (boardId: string): IRes<ResponseInterface<ICard>> =>
    apiService.get(urls.card.base, { params: { boardId } }),
  create: (data: ICard): IRes<ICard> => apiService.post(urls.card.base, data),
  updateById: (id: string, data: Partial<ICard>): IRes<ICard> =>
    apiService.put(urls.card.byId(id), data),
  updateCardStateOrder: (id: string, data: Partial<ICard>): IRes<ICard> =>
    apiService.patch(urls.card.byId(id), data),
  deleteById: (id: string): IRes<void> => apiService.delete(urls.card.byId(id)),
};

export { cardService };
