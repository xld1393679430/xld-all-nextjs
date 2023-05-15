import { Button } from "antd";
import Link from "next/link";
class Index extends React.Component {

  render() {
    return (
      <div>
        <p>Hooks Demo</p>
        <Link href="/hooks-demo/use-reducer" >
          <Button>useReducer</Button>
        </Link>
      </div>
    );
  }
}

export default Index;
