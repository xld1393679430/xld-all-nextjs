import { memo, useContext, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import cName from "classnames";
import { ThemeContext } from "@/store/theme";
import styles from "./index.module.scss";

interface IProps {
  title: string;
  description: string;
  list: {
    label: string;
    info: string;
    link: string;
  }[];
}

interface IOtherProps {
  isMobile: boolean
}

const Index: NextPage<IProps & IOtherProps, {}> = ({ title, description, list, isMobile }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(theme, typeof window, '----theme')
    mainRef.current?.classList.remove(styles.withAnimation);
    // window.requestAnimationFrame(() => {
    //   mainRef.current?.classList.add(styles.withAnimation);
    // });
    setTimeout(() => {
      mainRef.current?.classList.add(styles.withAnimation);
    })
  }, [theme]);

  return (
    <div className={styles.container}>
      <main className={cName([styles.main, styles.withAnimation])} ref={mainRef}>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>{description}</p>

        <p className={styles.description}>当前{isMobile ? "是" : "不是"}移动端</p>
        <p>
          <Link href="/image-view">
            <a>To Image</a>
          </Link>
        </p>

        <div className={styles.grid}>
          {list?.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.card}
                onClick={(): void => {
                  window.open(item.link, "blank", "noopener=yes,noreferrer=yes");
                }}
              >
                <h2>{item.label} &rarr;</h2>
                <p>{item.info}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

Index.getInitialProps = async (context) => {
  return {
    title: "Hello SSR!",
    description: "Demo",
    list: [
      {
        label: "文章1",
        info: "A test for article1",
        link: "/article/1",
      },
      {
        label: "文章2",
        info: "A test for article2",
        link: "/article/2",
      },
      {
        label: "文章3",
        info: "A test for article3",
        link: "/article/3",
      },
      {
        label: "文章4",
        info: "A test for article4",
        link: "/article/4",
      },
      {
        label: "文章5",
        info: "A test for article5",
        link: "/article/5",
      },
      {
        label: "文章6",
        info: "A test for article6",
        link: "/article/6",
      },
    ],
  };
};

export default Index;
