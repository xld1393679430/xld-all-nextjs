import { useEffect, useState, useCallback, Suspense, createElement } from "react";

const getList = () => {
  return new Promise((resolve) => {
    fetch("https://api.tvmaze.com/search/shows?q=batman").then((res) => {
      setTimeout(() => {
        resolve(res.json());
      }, 1000);
    });
  });
};

const List = ({ data = [], shows }) => {
  const [list, setList] = useState(data);

//   const initList = useCallback(async () => {
//     const data = await getList();
//     setList(data);
//   }, []);

//   useEffect(() => {
//     if (!list?.length) {
//       initList();
//     }
//   }, [list, initList]);

//   console.log(list, shows, 8888);
  return (
    <div>
      <p>List 组件 -- {data?.length ? "服务端渲染" : "客户端渲染"}</p>
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item.score}</li>;
        })}
      </ul>
    </div>
  );
};

List.getInitialProps = async function() {
  const data = await getList();

  return {
    shows: data,
  };
};

const Index = ({ shows }) => {
	const ss = createElement(Index)
	console.log(ss, ss.children, 4444)
  return (
    <div>
      <p>testComponentServer</p>
      <List />
      {/* <List data={shows || []} /> */}
    </div>
  );
};

Index.getInitialProps = async function() {
  const data = await getList();

  const aaa = await List.getInitialProps()

//   console.log(5555, this);

//   console.log(Index)

  return {
    shows: data,
  };
};

export default Index;
