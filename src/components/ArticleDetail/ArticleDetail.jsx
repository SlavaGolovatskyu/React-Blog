import React from 'react';
import Comments from '../Comments/Comments';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { instance } from '../../config/axios';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dateToLocaleString from './../../utils/dateToLocaleString';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

import { addCommentRequest } from '../../redux/actions/comments';

export const ArticleDetail = () => {
  const [commentText, setCommentText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [article, setArticle] = React.useState({});

  const isAuth = useSelector((state) => state.user.isAuth);
  const totalItems = useSelector((state) => state.comments.totalItems);

  const params = useParams();
  const dispatch = useDispatch();

  const onClickAddComment = () => {
    if (commentText.trim().length >= 3) {
      dispatch(addCommentRequest(commentText, params.id));
      setCommentText('');
    } else {
      alert('Минимальная длинна коментария должна состовлять 3 символа');
    }
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await instance.get(`posts/${params.id}`);
        data.createdAt = dateToLocaleString(data.createdAt);
        setArticle(data);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.main__info}>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            className={styles.createdAt}
          >
            <h4 className={styles.article__createdAt}>{article.createdAt}</h4>
            <VisibilityIcon className={styles.article__views} />
            <p className={styles.article__views}>{article.views}</p>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
        </div>

        <img className={styles.photo} src={article.photoUrl} alt="" />

        <MDEditor.Markdown
          source={article.text}
          rehypePlugins={[[rehypeSanitize]]}
          className={styles.text}
        />

        <h3 className={styles.total__comments}>Комментарии ({totalItems})</h3>

        <Comments postId={params.id} />

        {isAuth && (
          <>
            <p className={styles.add__comment}>Добавить коментарий</p>

            <TextField
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              sx={{ m: '10px 0' }}
              fullWidth
              id="fullWidth"
            />

            <div className={styles.submit}>
              <button className={styles.publish} onClick={onClickAddComment}>
                Отправить
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
