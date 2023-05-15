import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function matDispatchToProps(dispatch) {
  return {
    add: (count = 10) => {
      return dispatch({
        type: "Add",
        payload: {
          count,
        },
      });
    },
  };
}

class Index extends React.Component {
  render() {
    const { counter, add } = this.props;
    return (
      <div>
        <p>Redux Demo</p>
        <p>count: {counter.count}</p>
        <button onClick={() => add()}>Add</button>
      </div>
    );
  }
}

Index.getInitialProps = async ({reduxStore}) => {
  reduxStore.dispatch({
    type: 'Add'
  })
  return {};
};

export default connect(mapStateToProps, matDispatchToProps)(Index);
