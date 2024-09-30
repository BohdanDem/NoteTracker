import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './BoardForm.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { IBoard } from '../../../interfaces/board.interface';
import { boardsActions } from '../../../redux/slices/boardsSlice';
import { joiResolver } from '@hookform/resolvers/joi';
import { boardValidator } from '../../../validators/board.validator';
import { boardForUpdateActions } from '../../../redux/slices/boardForUpdateSlice';

const BoardForm = () => {
  const dispatch = useAppDispatch();
  const { boardForUpdate } = useAppSelector((state) => state.boardForUpdate);
  const { page } = useAppSelector((state) => state.boards);

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoard>({
    mode: 'onSubmit',
    resolver: joiResolver(boardValidator),
  });

  useEffect(() => {
    if (boardForUpdate) {
      setValue('name', boardForUpdate.name);
    }
  }, [boardForUpdate, setValue]);

  const createBoard: SubmitHandler<IBoard> = async (
    board: IBoard,
  ): Promise<void> => {
    await dispatch(boardsActions.createBoard({ board }));
    await dispatch(boardsActions.getAllBoards({ page }));
    reset();
  };

  const updateBoard: SubmitHandler<IBoard> = async (
    board: IBoard,
  ): Promise<void> => {
    await dispatch(boardsActions.updateBoard({ id: boardForUpdate.id, board }));
    await dispatch(boardsActions.getAllBoards({ page }));
    dispatch(boardForUpdateActions.setBoardForUpdate({ board: null }));
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
      <button
        className={styles.button}
        onClick={handleSubmit(boardForUpdate ? updateBoard : createBoard)}
      >
        {boardForUpdate ? 'UPDATE' : 'CREATE'}
      </button>
    </form>
  );
};

export default BoardForm;
