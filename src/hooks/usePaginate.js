import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const usePaginate = (componentName, perPage = 5) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const { totalItems, items } = useSelector((state) => state[componentName]);

  const totalPages = Math.ceil(totalItems / perPage);

  return { page, setPage, totalPages, totalItems, items, dispatch };
};
