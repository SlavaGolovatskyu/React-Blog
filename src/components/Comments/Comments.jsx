import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  commentsAction,
  deleteCommentRequest,
  editCommentRequest,
} from '../../redux/actions/comments';

import { SkeletonCommentsPosts } from '../Skeleton/Comments-Posts';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import styles from './index.module.scss';
import dateToLocaleString from './../../utils/dateToLocaleString';
import { IsOwner } from './../isOwner/owner';

import { usePaginate } from '../../hooks/usePaginate';

function Comment({ comment }) {
  const dispatch = useDispatch();
  const createdAt = dateToLocaleString(comment.createdAt);

  const onClickDelete = () => {
    if (window.confirm('Вы действительно хотите удалить коментарий?')) {
      dispatch(deleteCommentRequest(comment._id));
    }
  };

  const onClickEdit = () => {
    const text = window.prompt('Редактировать коментарий', `${comment.text}`);
    if (text !== comment.text) {
      if (text.trim().length > 3) {
        dispatch(editCommentRequest(text, comment._id));
      } else {
        alert('Длинна коментария должна быть от 3 символов');
      }
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment__wrapper}>
        <div className={styles.comment__username_owner}>{comment.user.fullName}</div>
        <div className={styles.comment__createdAt}>{createdAt}</div>
      </div>
      <div className={styles.comment__text}>{comment.text}</div>
      <IsOwner
        ownerId={comment.user._id}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
    </div>
  );
}

// isUser needed in order to realize what he should receive from backend
// if isUser true than we recive user's comments
// else get comments from specific post
const Comments = ({ isUser = false, postId = '' }) => {
  const perPageLimit = 5;

  const { page, setPage, totalPages, items, dispatch } = usePaginate(
    'comments',
    perPageLimit,
  );

  const loading = useSelector((state) => state.loading.comments);

  const getComments = (currentPage = 1) => {
    const userId = isUser ? window.localStorage.getItem('_id') : '';
    dispatch(commentsAction(postId, userId, '', currentPage, perPageLimit));
  };

  const onChangePage = (page) => {
    setPage(page);
    getComments(page);
  };

  React.useEffect(getComments, [isUser, postId, dispatch]);

  if (!items && !loading) {
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
          {!!items.length && (
            <>
              {items.map((comment) => (
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
        </>
      )}

      {loading && <SkeletonCommentsPosts />}
    </>
  );
};

export default Comments;
