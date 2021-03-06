import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postsAction, deletePostRequest } from '../../redux/actions/posts';
import { IsOwner } from '../isOwner/owner';

import { SkeletonCommentsPosts } from '../Skeleton/Comments-Posts';
import dateToLocaleString from '../../utils/dateToLocaleString';
import styles from './index.module.scss';

import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

import { usePaginate } from '../../hooks/usePaginate';

function Article({ article }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const createdAt = dateToLocaleString(article.createdAt);

  const onClickDelete = () => {
    if (window.confirm('Вы действительно хотите удалить запис?')) {
      dispatch(deletePostRequest(article._id));
    }
  };

  const onClickEdit = () => {
    const url = `/edit-article/${article._id}`;
    history.push(url);
  };

  const onClickDetail = () => {
    const url = `/article-detail/${article._id}`;
    history.push(url);
  };

  return (
    <div className={styles.article__flex_direction}>
      <div className={styles.article}>
        <div onClick={onClickDetail}>
          <h2 className={styles.article__title}>{article.title}</h2>
          <MDEditor.Markdown
            source={article.text}
            rehypePlugins={[[rehypeSanitize]]}
            className={styles.article__text}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h4 className={styles.article__createdAt}>{createdAt}</h4>
            <VisibilityIcon
              className={styles.article__views + ' ' + styles.article__createdAt}
            />
            <p className={styles.article__views + ' ' + styles.article__createdAt}>
              {article.views}
            </p>
          </div>
        </div>
        <IsOwner
          ownerId={article.user._id}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      </div>
      <div>
        <img className={styles.article__img} src={article.photoUrl} alt="" />
      </div>
    </div>
  );
}

// isUser needed in order to which articles uploading
// if user located on main page, articles uploading desc.
// elif user located in himself profile, we uploading user's articles
function Articles({ isUser = false }) {
  const perPageLimit = 5;

  const { page, setPage, totalPages, items, dispatch } = usePaginate(
    'posts',
    perPageLimit,
  );

  const loading = useSelector((state) => state.loading.posts);

  const setArticles = (currentPage = 1) => {
    const userId = isUser ? window.localStorage.getItem('_id') : '';
    dispatch(postsAction(userId, '', currentPage, perPageLimit));
  };

  const onChangeCurrentPage = (value) => {
    setPage(value);
    setArticles(value);
  };

  React.useEffect(setArticles, [isUser, dispatch]);

  if (!items && !loading) {
    return (
      <div
        style={{
          margin: '25px 0 0 25px',
          textAlign: isUser ? 'left' : 'center',
          overflowY: 'hidden',
        }}
      >
        {!isUser && <h2>Пока что на нашем сайте нету статей.</h2>}
        {isUser && <h2>Пока что, вы не написали никаких статей.</h2>}
      </div>
    );
  }

  return (
    <>
      {!loading && (
        <>
          <div className={styles.articles}>
            {items.map((article) => (
              <Article key={article._id} article={article} />
            ))}

            <Stack spacing={1} sx={{ marginLeft: '15px' }}>
              <Pagination
                page={page}
                onChange={(e, value) => onChangeCurrentPage(value)}
                count={totalPages}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </>
      )}

      {loading && <SkeletonCommentsPosts />}
    </>
  );
}

export default Articles;
