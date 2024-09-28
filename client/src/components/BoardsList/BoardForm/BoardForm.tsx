import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './BoardForm.module.css';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { IBoard } from '../../../interfaces/board.interface';
import { boardsActions } from '../../../redux/slices/boardsSlice';
import { joiResolver } from '@hookform/resolvers/joi';
import { boardValidator } from '../../../validators/board.validator';

const BoardForm = () => {
  const dispatch = useAppDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoard>({
    mode: 'onSubmit',
    resolver: joiResolver(boardValidator),
  });

  const createBoard: SubmitHandler<IBoard> = async (board): Promise<void> => {
    await dispatch(boardsActions.createBoard({ board }));
    await dispatch(boardsActions.getAllBoards());
    reset();
  };

  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder={'Input board name'}
          {...register('name')}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>
      <button className={styles.button} onClick={handleSubmit(createBoard)}>
        CREATE
      </button>
    </form>
  );
};

export default BoardForm;
