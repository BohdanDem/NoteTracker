import React, { FC, PropsWithChildren, useEffect } from 'react';
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

interface IProps extends PropsWithChildren {
  setResponseError: (value: string) => void;
}

const CardForm: FC<IProps> = ({ setResponseError }) => {
  const dispatch = useAppDispatch();
  const { isModalActive } = useAppSelector((state) => state.modalState);
  const { cardForUpdate } = useAppSelector((state) => state.cardForUpdate);

  const {
    reset,
    register,
    setValue,
    setError,
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
    const boardId = localStorage.getItem('boardId');
    const data = { boardId, ...card };

    if (cardForUpdate) {
      await dispatch(cardsActions.updateCard({ id: cardForUpdate.id, card }));
    } else {
      const response: any = await dispatch(
        cardsActions.createCard({ card: data }),
      );
      if (response.payload?.statusCode === 422) {
        setResponseError('The board with this Id does not exist');
      }
    }

    await dispatch(cardsActions.getAllCards({ boardId }));
    reset();
    closeModal();
  };

  const closeModal = () => {
    dispatch(modalStateActions.setModalActive({ state: false }));
    dispatch(cardForUpdateActions.setCardForUpdate({ card: null }));
    setValue('title', null);
    setValue('description', null);
    setError('title', null);
    setError('description', null);
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
              <textarea
                className={styles.textarea}
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
