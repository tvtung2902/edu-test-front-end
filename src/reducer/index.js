import {combineReducers} from "redux";
import { questionReducer } from "./question";
import { categoryReducer } from "./category";
const allReducers = combineReducers({
  questionReducer, categoryReducer
});

export default allReducers;