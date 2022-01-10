import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postsAction } from '../../redux/actions/posts';

import { SkeletonCommentsPosts } from '../Skeleton/Comments-Posts';
import dateToLocaleString from '../../utils/dateToLocaleString';
import styles from './index.module.scss';
import myPhoto from '../../assets/IMG_0508.jpg';

import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

function Article({ article }) {
  const createdAt = dateToLocaleString(article.createdAt);

  return (
    <div className={styles.article__flex_direction}>
      <div className={styles.article}>
        <h2 className={styles.article__title}>{article.title}</h2>
        <p className={styles.article__text}>{article.text}</p>
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
      <div>
        <img className={styles.article__img} src={myPhoto} alt="фотография" />
      </div>
    </div>
  );
}

// isUser needed in order to which articles uploading
// if user located on main page, articles uploading desc.
// elif user located in himself profile, we uploading user's articles
function Articles({ isUser = false }) {
  const [page, setPage] = React.useState(1);
  const loading = useSelector((state) => state.loading.isLoading);
  const { totalPosts, posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  // dividing on 5 because backend have limit. We can change him of course
  // but us еnough just 5
  const totalPages = Math.ceil(totalPosts / 5);

  const setArticles = (currentPage = 1) => {
    const userId = isUser ? window.localStorage.getItem('_id') : '';
    dispatch(postsAction(userId, '', currentPage));
  };

  const onChangeCurrentPage = (value) => {
    setPage(value);
    setArticles(value);
  };

  React.useEffect(setArticles, [isUser, dispatch]);

  if (!posts.length && !loading) {
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
          {posts.map((article) => (
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
        </>
      )}

      {loading && <SkeletonCommentsPosts />}
    </>
  );
}

export default Articles;
