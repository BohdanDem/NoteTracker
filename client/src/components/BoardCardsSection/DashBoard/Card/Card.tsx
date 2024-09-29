import React, { FC, PropsWithChildren } from 'react';
import styles from './Card.module.css';
import { ReactComponent as UpdateIcon } from '../../../../images/update.svg';
import { ReactComponent as BasketIcon } from '../../../../images/basket.svg';
import { ICard } from '../../../../interfaces/card.interface';

interface IProps extends PropsWithChildren {
  card: ICard;
}

const Card: FC<IProps> = ({ card }) => {
  const { title, description } = card;

  return (
    <div>
      <div className={styles.info}>
        <div>
          <b>{title}</b>
        </div>
        <div>{description}</div>
      </div>
      <div className={styles.icons}>
        <UpdateIcon className={styles.icon} width={25} height={25} />
        <BasketIcon className={styles.icon} width={20} height={20} />
      </div>
    </div>
  );
};

export default Card;
