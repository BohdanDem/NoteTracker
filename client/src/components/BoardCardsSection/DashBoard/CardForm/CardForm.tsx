import React, { useEffect } from 'react';
import styles from './CardForm.module.css';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { modalStateActions } from '../../../../redux/slices/modalStateSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { cardValidator } from '../../../../validators/card.validator';
import { ICard } from '../../../../interfaces/card.interface';
import { cardsActions } from '../../../../redux/slices/cardsSlice';
import { cardForUpdateActions } from '../../../../redux/slices/cardForUpdateSlice';

const CardForm = () => {
  const dispatch = useAppDispatch();
  const { isModalActive } = useAppSelector((state) => state.modalState);
  const { cardForUpdate } = useAppSelector((state) => state.cardForUpdate);
  const { boardId } = useAppSelector((state) => state.boardId);

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ICard>({
    mode: 'onSubmit',
    resolver: joiResolver(cardValidator),
  });

  useEffect(() => {
    if (cardForUpdate) {
      setValue('title', cardForUpdate.title);
      setValue('description', cardForUpdate.description);
    }
  }, [cardForUpdate, setValue]);

  const send: SubmitHandler<ICard> = async (card: ICard): Promise<void> => {
    await dispatch(cardsActions.createCard({ card }));
    dispatch(cardsActions.getAllCards({ boardId }));
    reset();
  };

  const closeModal = () => {
    dispatch(modalStateActions.setModalActive({ state: false }));
    dispatch(cardForUpdateActions.setCardForUpdate({ card: null }));
    setValue('title', null);
    setValue('description', null);
  };

  return ReactDOM.createPortal(
    <div
      className={
        isModalActive ? `${styles.modal} ${styles.modal_active}` : styles.modal
      }
      onClick={closeModal}
    >
      <div
        className={
          isModalActive
            ? `${styles.modal_content} ${styles.modal_content_active}`
            : styles.modal_content
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.block}>
          <button className={styles.cross} onClick={closeModal}>
            &#10006;
          </button>
          <form className={styles.form}>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="text"
                placeholder={'Input board title'}
                {...register('title')}
              />
              {errors.title && (
                <span className={styles.error}>{errors.title.message}</span>
              )}
            </div>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="text"
                placeholder={'Input board description'}
                {...register('description')}
              />
              {errors.description && (
                <span className={styles.error}>
                  {errors.description.message}
                </span>
              )}
            </div>
            <button className={styles.button} onClick={handleSubmit(send)}>
              {cardForUpdate ? 'UPDATE' : 'CREATE'}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('portal'),
  );
};

export default CardForm;
