import { FC } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import cName from "classnames";

interface ILink {
  label: string;
  link?: string;
}

interface ILinkList {
  title: string;
  list: ILink[];
}

interface IQRCode {
  image: string;
  text: string;
}

export interface IFooterProps {
  title: string;
  linkList: ILinkList[];
  qrCode: IQRCode;
  copyRight: string;
  siteNumber: string; // 站点备案号
  publicNumber: string; // 公安备案号
}

export const Footer: FC<IFooterProps> = ({ title, linkList, qrCode, copyRight, siteNumber, publicNumber }) => {
  return (
    <div className={styles.footer}>
      <span>{copyRight}</span>
      <span>{siteNumber}</span>
      <span>{publicNumber}</span>
    </div>
  );
};
