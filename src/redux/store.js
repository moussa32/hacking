import { createStore } from "redux";
import rootReducer from "../modules/Blog/reducers";
import middleware from "./middleware";

export const store = createStore(rootReducer, middleware);