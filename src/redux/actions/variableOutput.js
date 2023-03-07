import {
  ADD_OUTPUTVAR,
  ADD_OUTPUTVAR_INPUT,
  DELETE_OUTPUTVAR,
  EDIT_OUTPUTVAR,
} from "../types";

export const SubmitOutputVar = (formState) => {
  return {
    type: ADD_OUTPUTVAR,
    payload: formState,
  };
};
export const removeOutputVar = (index) => {
  return {
    type: DELETE_OUTPUTVAR,
    payload: index,
  };
};
export const addOutputVariableInput = () => {
  return {
    type: ADD_OUTPUTVAR_INPUT,
  };
};
export const editOutputVariable = (updatedOutputVar) => {
  console.log(updatedOutputVar);
  return {
    type: EDIT_OUTPUTVAR,
    payload: updatedOutputVar,
  };
};
