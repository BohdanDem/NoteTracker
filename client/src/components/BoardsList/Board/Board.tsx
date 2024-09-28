import React, { FC, PropsWithChildren } from 'react';
import styles from './Board.module.css';
import { IBoard } from '../../../interfaces/board.interface';

interface IProps extends PropsWithChildren {
  board: IBoard;
}

const Board: FC<IProps> = ({ board }) => {
  const { id, name } = board;

  return (
    <div className={styles.board}>
      <div>
        name: <b>{name}</b>
      </div>
      <div>
        board Id: <b>{id}</b>
      </div>
    </div>
  );
};

export default Board;
