import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postsAction } from '../../redux/actions/posts';

import VisibilityIcon from '@mui/icons-material/Visibility';
import Skeleton from '@mui/material/Skeleton';

import dateToLocaleString from '../../utils/dateToLocaleString';
import styles from './index.module.scss';
import myPhoto from '../../assets/IMG_0508.jpg';

function Article({ article, img = false }) {
  return (
    <div className={styles.article__flex_direction}>
      <div className={styles.article}>
        <h2 className={styles.article__title}>{article.title}</h2>
        <p className={styles.article__text}>{article.text}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h4 className={styles.article__createdAt}>{dateToLocaleString(article.createdAt)}</h4>
          <VisibilityIcon className={styles.article__views + ' ' + styles.article__createdAt} />
          <p className={styles.article__views + ' ' + styles.article__createdAt}>{article.views}</p>
        </div>
      </div>
      {img && (
        <div>
          <img className={styles.article__img} src={myPhoto} />
        </div>
      )}
    </div>
  );
}

// stateless component
function Articles({ isUser = false }) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { totalPosts, posts, currentPage } = useSelector((state) => state.posts);

  React.useEffect(() => {
    setLoading(true);
    const userId = isUser ? window.localStorage.getItem('_id') : '';
    dispatch(postsAction(userId));
    setLoading(false);
  }, []);

  if (!posts.length) {
    return (
      <div style={{ margin: '25px 0 0 25px', textAlign: isUser ? 'left' : 'center' }}>
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
            <Article key={article._id} article={article} img={true} />
          ))}
        </>
      )}

      {/* TODO PAGINATION */}
      {loading && (
        <>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </>
      )}
    </>
  );
}

export default Articles;
