import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { Layout, ILayoutProps } from "@/components/layout";
import { ThemeProvider } from "@/store/theme";
import { UserAgentProvider } from "@/store/userAgent";
import { getIsMobile } from '@/utils'
import "../styles/globals.css";

function MyApp(data: AppProps & ILayoutProps & { isMobile: boolean }) {
  const { Component, pageProps, navbarData, footerData, isMobile } = data;
  return (
    <>
      <Head>
        <title>{isMobile ? '移动端' : 'PC端'} - Nextjs</title>
        <meta name="description" content="这是meta信息" />
      </Head>
      <ThemeProvider>
        <UserAgentProvider>
          <Layout navbarData={navbarData} footerData={footerData}>
            <Component {...pageProps} isMobile={isMobile} />
          </Layout>
        </UserAgentProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);

  return {
    ...pageProps,
    navbarData: {},
    footerData: {
      copyRight: "Copyright © 2022 xxx. 保留所有权利",
      siteNumber: "粤ICP备XXXXXXXX号-X",
      publicNumber: "粤公网安备 xxxxxxxxxxxxxx号",
    },
    isMobile: getIsMobile(context)
  };
};

export default MyApp;
