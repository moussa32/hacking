import { combineReducers } from "redux";
import blogs from "./blogs";
import program from "../../Program/reducers/program";


export default combineReducers({
  blogs,
  program,
});
