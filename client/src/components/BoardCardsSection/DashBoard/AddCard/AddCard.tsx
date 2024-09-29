import React from 'react';
import styles from './AddCard.module.css';
import { ReactComponent as PlusIcon } from '../../../../images/plus.svg';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { modalStateActions } from '../../../../redux/slices/modalStateSlice';

const AddCard = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(modalStateActions.setModalActive({ state: true }));
  };

  return (
    <div onClick={openModal} className={styles.main}>
      <PlusIcon className={styles.icon} width={40} height={40} />
    </div>
  );
};

export default AddCard;
