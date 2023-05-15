import dynamic from "next/dynamic";

const TestCompDymnamic = dynamic(import("../../components/TestComp"));

class Index extends React.Component {
  render() {
    return (
      <div>
        <p>LazyComponent</p>
        <TestCompDymnamic />
      </div>
    );
  }
}

export default Index;
