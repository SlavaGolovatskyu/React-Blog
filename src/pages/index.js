import React from "react";
import Menu from "../components/Menu/Menu";
import Header from "../components/Header/Header";
import About from "../components/AboutMe/About";
import Article from "../components/Article/Article";
import styles from "./pages.module.scss";
import arthur from "../assets/myphoto.jpg";
import myPhoto from "../assets/IMG_0508.jpg";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <About />
      <div className={styles.header}>
        <div className={styles.head}>
          <Header />
        </div>
        <div className={styles.articles}>
          <Article img={1} />
          <Article />
          <Article />
          <Article />
          <Article />
        </div>
      </div>
      <Menu />
    </div>
  );
}
