import { FC, useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/store/theme";
import { UserAgentContext } from '@/store/userAgent'
import { Themes } from "@/constants/enum";
import styles from "./index.module.scss";

export interface INavBarProps {}

export const NavBar: FC<INavBarProps> = () => {
  const { setTheme, theme } = useContext(ThemeContext)
  const { userAgent } = useContext(UserAgentContext)

  const toggleTheme = () => {
    if (theme === Themes.light) {
      setTheme(Themes.dark)
    } else {
      setTheme(Themes.light)
    }
  }

  return (
    <div className={styles.navBar}>
      <Link href="/">
        <a>首页</a>
      </Link>
      <span>当前设备是： {userAgent}</span>
      <button onClick={toggleTheme}>切换主题--{theme}</button>
    </div>
  );
};
