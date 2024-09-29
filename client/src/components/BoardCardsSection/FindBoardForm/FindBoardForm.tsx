import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './FindBoardForm.module.css';
import { IBoard } from '../../../interfaces/board.interface';
import { joiResolver } from '@hookform/resolvers/joi';
import { boardIdValidator } from '../../../validators/boardId.validator';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { boardIdActions } from '../../../redux/slices/boardIdSlice';

const FindBoardForm = () => {
  const dispatch = useAppDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoard>({
    mode: 'onSubmit',
    resolver: joiResolver(boardIdValidator),
  });

  const loadBoard: SubmitHandler<IBoard> = async (
    board: IBoard,
  ): Promise<void> => {
    localStorage.setItem('boardId', board.id.toString());
    dispatch(boardIdActions.setBoardId({ boardId: board.id }));
    reset();
  };

  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder={'Enter a board ID here...'}
          {...register('id')}
        />
        {errors.id && <span className={styles.error}>{errors.id.message}</span>}
      </div>
      <button className={styles.button} onClick={handleSubmit(loadBoard)}>
        LOAD
      </button>
    </form>
  );
};

export default FindBoardForm;
