import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import auth from "./auth";
import { History } from "history";

// History 제네릭 형식 확인 (unknown)
const reducer = (history: History) => 
  combineReducers({
  auth,
  router: connectRouter(history),
});

export default reducer;