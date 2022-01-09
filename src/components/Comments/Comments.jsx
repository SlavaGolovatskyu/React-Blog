import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';

function Comment({ comment }) {
  return;
}

const Comments = () => {
  const [page, setPage] = React.useState(1);
  const loading = useSelector((state) => state.loading.isLoading);
  const { totalComments, comments } = useSelector((state) => state.comments);

  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalPosts / 5);

  return <div></div>;
};

export default Comments;
