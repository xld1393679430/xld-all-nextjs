import { Button } from "antd";
import Router, { withRouter } from "next/router";

var routerEvents = [
  "routeChangeStart",
  "beforeHistoryChange",
  "routeChangeComplete",
  "routeChangeError",
  "hashChangeStart",
  "hashChangeComplete",
];

function makeEvets(type) {
  return (...args) => {
    // console.log(type, ...args);
  };
}

routerEvents.forEach((event) => {
  Router.events.on(event, makeEvets(event));
});

class Index extends React.Component {
  render() {
    return (
      <div>
        <p>route-events</p>
      </div>
    );
  }
}

export default withRouter(Index);
