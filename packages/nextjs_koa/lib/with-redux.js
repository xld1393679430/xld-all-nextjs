import createStore from "../store";

const { isServer } = require("../utils");

const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";
function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default (Comp) => {
  class withRedux extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <Comp {...this.props} reduxStore={this.reduxStore} />;
    }
  }

  withRedux.getInitialProps = async (ctx) => {
    let reduxStore;

    if (isServer) {
      const { req } = ctx.ctx;
      const session = req.session;

      if (session && session.userInfo) {
        reduxStore = getOrCreateStore({
          user: session.userInfo,
        });
      } else {
        reduxStore = getOrCreateStore();
      }
    } else {
      reduxStore = getOrCreateStore();
    }

    ctx.reduxStore = reduxStore;
    let appProps = {};
    if (typeof Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }
    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  };
  return withRedux;
};
