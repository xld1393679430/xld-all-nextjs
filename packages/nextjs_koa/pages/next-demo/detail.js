import { Button } from "antd";
import { withRouter } from "next/router";
import styled from "styled-components";

const Title = styled.div`
  color: red;
`;
class Index extends React.Component {
  render() {
    const { router } = this.props;
    return (
      <div>
        <Title>Detail</Title>
        <span>parmas id： {router.query.id}</span>
      </div>
    );
  }
}

export default withRouter(Index);
