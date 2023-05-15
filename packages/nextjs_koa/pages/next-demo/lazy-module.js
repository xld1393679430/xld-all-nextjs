import { Button } from "antd";
import { withRouter } from "next/router";
class Index extends React.Component {
  render() {
    const { name, time } = this.props;
    return (
      <div>
        <p>LazyModule</p>
        <span>name： {name}</span>
        <p>time: {time}</p>
      </div>
    );
  }
}

Index.getInitialProps = async () => {
  // 异步加载模块
  const moment = await import("moment");
  const fetchData = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "joky",
        time: moment.default(Date.now() - 60 * 1000 * 100).fromNow(),
      });
    }, 200);
  });
  return await fetchData;
};

export default withRouter(Index);
