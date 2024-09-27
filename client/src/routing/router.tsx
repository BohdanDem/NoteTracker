import { createBrowserRouter } from 'react-router-dom';
import MainView from '../components/MainView/MainView';
import { AppRoutes } from './appRotes';
import BoardsList from '../components/BoardsList/BoardsList';
import BoardCardsSection from '../components/BoardCardsSection/BoardCardsSection';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainView />,
    errorElement: (
      <h2>Ops, wrong way. The resource you requested could not be found.</h2>
    ),
    children: [
      {
        path: AppRoutes.BOARDS_LIST,
        element: <BoardsList />,
      },
      {
        path: AppRoutes.BOARD_CARDS_SECTION,
        element: <BoardCardsSection />,
      },
    ],
  },
]);

export { router };
