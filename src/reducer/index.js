import {combineReducers} from "redux";
import { questionReducer } from "./question";
const allReducers = combineReducers({
  questionReducer
});

export default allReducers;