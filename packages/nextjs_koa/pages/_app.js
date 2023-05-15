import App, { Container } from "next/app";
import { Provider } from "react-redux";
import Router from "next/router";
import "antd/dist/antd.css";
import withRedux from "../lib/with-redux";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
    };
  }

  state = {
    loading: false,
  };

  startLoading = () => {
    this.setState({
      loading: true,
    });
  };

  stopLoading = () => {
    this.setState({
      loading: false,
    });
  };

  componentDidMount() {
    Router.events.on("routeChangeStart", this.startLoading);
    Router.events.on("routeChangeComplete", this.stopLoading);
    Router.events.on("routeChangeError", this.stopLoading);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.startLoading);
    Router.events.off("routeChangeComplete", this.stopLoading);
    Router.events.off("routeChangeError", this.stopLoading);
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const { loading } = this.state;
    return (
      <Container>
        <Provider store={reduxStore}>
          {loading ? <Loading /> : null}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(MyApp);
