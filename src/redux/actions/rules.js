import { EDIT_RULE, ADD_RULE, ADD_RULE_INPUT, DELETE_RULE } from "../types";

export const SubmitRule = (formState) => {
  return {
    type: ADD_RULE,
    payload: formState,
  };
};
export const removeRule = (index) => {
  return {
    type: DELETE_RULE,
    payload: index,
  };
};
export const addRuleInput = () => {
  return {
    type: ADD_RULE_INPUT,
  };
};
export const editRule = (rule) => {
  return {
    type: EDIT_RULE,
    payload: rule,
  };
};
