const baseURL = process.env.REACT_APP_API;

const board = '/board';
const card = '/card';

const urls = {
  board: {
    base: board,
    byId: (id: string): string => `${board}/${id}`,
  },
  card: {
    base: card,
    byId: (id: string): string => `${card}/${id}`,
  },
};

export { baseURL, urls };
