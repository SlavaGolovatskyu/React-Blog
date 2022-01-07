import styles from './index.module.scss';
import myPhoto from '../../assets/IMG_0508.jpg';

function Article({ img = false }) {
  return (
    <div className={styles.article__flex_direction}>
      <div className={styles.article}>
        <h2 className={styles.article__title}>JavaScript: Как с помощью Dadata определить город по ip?</h2>
        <p className={styles.article__text}>
          На работе потребовалось запилить задачу для автоматического определения города при совершении заказа. Было
          решено сделать это на фронте, ибо бек был занят.
        </p>
        <h4 className={styles.article__createdAt}>12 АВГУСТА 2019 В 08:06</h4>
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
function Articles({ articles = [], img = false }) {
  return (
    <>
      {articles.map((article, index) => {
        return <Article key={index} img={true} />;
      })}
    </>
  );
}

export default Articles;
