import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { boardsActions } from '../../redux/slices/boardsSlice';
import styles from './BoardsList.module.css';
import Board from './Board/Board';
import BoardForm from './BoardForm/BoardForm';
import PaginationControlled from '../Pagination/Pagination';

const BoardsList = () => {
  const dispatch = useAppDispatch();
  const { data, page } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(boardsActions.getAllBoards({ page }));
  }, [page]);

  return (
    <div className={styles.main}>
      <BoardForm />
      <PaginationControlled />
      {data && data.map((board) => <Board key={board.id} board={board} />)}
    </div>
  );
};

export default BoardsList;
