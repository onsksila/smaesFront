import {
  ADD_INPUTVAR,
  ADD_INPUTVAR_INPUT,
  DELETE_INPUTVAR,
  EDIT_INPUTVAR,
} from "../types";

export const SubmitInputVar = (formState) => {
  return {
    type: ADD_INPUTVAR,
    payload: formState,
  };
};
export const removeInputVar = (index) => {
  return {
    type: DELETE_INPUTVAR,
    payload: index,
  };
};
export const addInputVariable = () => {
  return {
    type: ADD_INPUTVAR_INPUT,
  };
};
export const editInputVariable = (updatedInputVar) => {
  console.log(updatedInputVar);
  return {
    type: EDIT_INPUTVAR,
    payload: updatedInputVar,
  };
};
