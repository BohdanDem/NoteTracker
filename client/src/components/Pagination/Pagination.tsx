import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import styles from './Pagination.module.css';
import { boardsActions } from '../../redux/slices/boardsSlice';

export default function PaginationControlled() {
  const dispatch = useAppDispatch();
  const { page, itemCount, limit } = useAppSelector((state) => state.boards);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(boardsActions.setNewPage({ page: Number(value) }));
  };

  return (
    <>
      {Math.ceil(itemCount / limit) > 1 && (
        <div className={styles.main}>
          <Stack spacing={3}>
            <Pagination
              count={Math.ceil(itemCount / limit)}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        </div>
      )}
    </>
  );
}
