import React from 'react';
import myPhoto from '../../assets/IMG_0508.jpg';
import styles from './index.module.scss';

const About = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.name}>Slavik Golovatskyu</h1>
      <p className={styles.title}>Блог фронтенд-разработчика</p>
      <img src={myPhoto} className={styles.img} alt="Тут должно было быть мое фото" />
      <h5>Обо мне</h5>
      <p className={styles.about__me}>
        Привет! Меня зовут Славик, мне 18 лет. На данный момент учусь в университете, на
        специальности компютерно-интегрированые технологии и автоматизация. Паралельно
        занимаюсь фронтендом, используя такие библиотеки как React, Redux, React Hook
        Forms, React Router, etc. Есть базовые знание верстки, js. Раньше учился писать
        бек на Python, с помощью таких фреймворков как Django и Flask.
      </p>
    </div>
  );
};

export default About;
