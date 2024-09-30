import React, { FC, PropsWithChildren } from 'react';
import styles from './Board.module.css';
import { IBoard } from '../../../interfaces/board.interface';
import { ReactComponent as UpdateIcon } from '../../../images/update.svg';
import { ReactComponent as BasketIcon } from '../../../images/basket.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { boardsActions } from '../../../redux/slices/boardsSlice';
import { boardForUpdateActions } from '../../../redux/slices/boardForUpdateSlice';

interface IProps extends PropsWithChildren {
  board: IBoard;
}

const Board: FC<IProps> = ({ board }) => {
  const { id, name } = board;
  const dispatch = useAppDispatch();
  const { page, itemCount, limit } = useAppSelector((state) => state.boards);

  const deleteBoard = async () => {
    await dispatch(boardsActions.deleteBoard({ id }));

    const totalPages = Math.ceil((itemCount - 1) / limit);

    if (page > totalPages) {
      if (totalPages > 0) {
        await dispatch(boardsActions.setNewPage({ page: totalPages }));
      } else await dispatch(boardsActions.getAllBoards({ page: page }));
    } else await dispatch(boardsActions.getAllBoards({ page: page }));
  };

  return (
    <div className={styles.board}>
      <div className={styles.info}>
        <div>
          name: <b>{name}</b>
        </div>
        <div>
          board Id: <b>{id}</b>
        </div>
      </div>
      <div className={styles.icons}>
        <UpdateIcon
          onClick={() =>
            dispatch(boardForUpdateActions.setBoardForUpdate({ board }))
          }
          className={styles.icon}
          width={38}
          height={38}
        />
        <BasketIcon
          onClick={deleteBoard}
          className={styles.icon}
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default Board;
