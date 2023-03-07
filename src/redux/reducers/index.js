import { combineReducers } from "redux";
import rules from "./rules";
import variableInput from "./variableInput";
import variableOutput from "./variableOutput";
export default combineReducers({ rules, variableInput, variableOutput });
