import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

const initialCounterState = {
  count: 1,
};

const counterReducer = (state = initialCounterState, { type, payload }) => {
  const count = (payload && payload.count) || 100;
  switch (type) {
    case "Add":
      return {
        ...state,
        count: state.count + count,
      };
    case "Del":
      return {
        ...state,
        count: state.count - count,
      };
    default:
      return state;
  }
};

const userInitialState = {};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export function logout() {
  return (dispatch) => {
    axios.post("/logout").then((res) => {
      if (res.status === 200) {
        dispatch({
          type: "LOGOUT",
        });
      }
    });
  };
}

export default function initializeStore(state) {
  const store = createStore(
    rootReducer,
    Object.assign(
      {},
      {
        counter: initialCounterState,
        user: userInitialState,
      },
      state
    ),
    composeWithDevTools(applyMiddleware(reduxThunk))
  );

  return store;
}
