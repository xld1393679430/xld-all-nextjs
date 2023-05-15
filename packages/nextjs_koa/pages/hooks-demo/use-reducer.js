import React, { useReducer } from "react";

function countReduce(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        count: state.count + 1,
      };
    case "del":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

const initialState = {
  count: 1,
};

const Index = () => {
  const [{ count }, dispatch] = useReducer(countReduce, initialState);

  const handleAdd = () => {
    dispatch({
      type: "add",
    });
  };

  const handleDel = () => {
    dispatch({
      type: "del",
    });
  };
  return (
    <div>
      <p>use-reducer</p>
      <p>count: {count}</p>
      <button onClick={handleAdd}>加一</button>
      <button onClick={handleDel}>减一</button>
    </div>
  );
};

export default Index;
