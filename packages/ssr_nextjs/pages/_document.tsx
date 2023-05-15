import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { Themes } from '@/constants/enum';

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
          const item = localStorage.getItem('theme') || "light";
          localStorage.setItem('theme', item);
          document.getElementsByTagName('html')[0].dataset.theme = item;
          `}
        </Script>
      </body>
    </Html>
  );
}
