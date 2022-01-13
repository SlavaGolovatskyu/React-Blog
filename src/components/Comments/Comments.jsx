import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsAction } from '../../redux/actions/comments';

import { SkeletonCommentsPosts } from '../Skeleton/Comments-Posts';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import styles from './index.module.scss';
import dateToLocaleString from './../../utils/dateToLocaleString';

function Comment({ comment }) {
  const createdAt = dateToLocaleString(comment.createdAt);

  return (
    <div className={styles.comment}>
      <div className={styles.comment__wrapper}>
        <div className={styles.comment__username_owner}>{comment.user.fullName}</div>
        <div className={styles.comment__createdAt}>{createdAt}</div>
      </div>
      <div className={styles.comment__text}>{comment.text}</div>
    </div>
  );
}

// isUser needed in order to realize what he should receive from backend
// if isUser true than we recive user's comments
// else get comments from specific post
const Comments = ({ isUser = false, postId = '' }) => {
  const [page, setPage] = React.useState(1);
  const loading = useSelector((state) => state.loading.commentsLoading);
  const { totalComments, comments } = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  // dividing on 5 because backend have limit. We can change him of course
  // but us еnough just 5
  const totalPages = Math.ceil(totalComments / 5);

  const getComments = (currentPage = 1) => {
    const userId = isUser ? window.localStorage.getItem('_id') : '';
    dispatch(commentsAction(postId, userId, '', currentPage));
  };

  const onChangePage = (page) => {
    setPage(page);
    getComments(page);
  };

  React.useEffect(getComments, [isUser, postId, dispatch]);

  if (!comments.length && !loading) {
    return (
      <div style={{ margin: '25px 0 0 25px', textAlign: isUser ? 'left' : 'center' }}>
        {!isUser && <h2>Пока что, на этом посте нету коментариев.</h2>}
        {isUser && <h2>Пока что, вы не написали никаких коментариев.</h2>}
      </div>
    );
  }

  return (
    <>
      {!loading && (
        <>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}

          <Stack spacing={1} sx={{ marginLeft: '15px' }}>
            <Pagination
              page={page}
              onChange={(e, value) => onChangePage(value)}
              count={totalPages}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </>
      )}

      {loading && <SkeletonCommentsPosts />}
    </>
  );
};

export default Comments;
