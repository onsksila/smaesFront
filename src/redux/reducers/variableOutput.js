import {
  ADD_OUTPUTVAR,
  ADD_OUTPUTVAR_INPUT,
  DELETE_OUTPUTVAR,
  EDIT_OUTPUTVAR,
} from "../types";

const initialState = {
  SubmittedOutputVars: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_OUTPUTVAR:
      return {
        ...state,
        SubmittedOutputVars: [
          ...state.SubmittedOutputVars,
          {
            idOutputVar: payload.idOutputVar,
            varName: payload.varName,
            varType: payload.varType,
            varValue: payload.varValue,
            varDefaultValue: payload.varDefaultValue,
            varEnum: payload.varEnum,
            varReadOnly: payload.varReadOnly,
          },
        ].filter((varInput) => varInput.varName !== ""),
      };
    case DELETE_OUTPUTVAR:
      const updatedOutputVars = [...state.SubmittedOutputVars];
      //updatedInputVars.filter(payload, 1);
      let filteredArray = updatedOutputVars.filter((item, index) => {
        return index !== payload;
      });
      return {
        ...state,
        SubmittedOutputVars: filteredArray,
      };
    case ADD_OUTPUTVAR_INPUT:
      return {
        ...state,
        SubmittedOutputVars: [
          ...state.SubmittedOutputVars,
          {
            varName: "",
            varType: "",
            varValue: "",
            varDefaultValue: "",
            varEnum: "",
            varReadOnly: "",
          },
        ],
      };
    case EDIT_OUTPUTVAR:
      return {
        ...state,
        SubmittedOutputVars: state.SubmittedOutputVars.map((outputVar) => {
          if (outputVar.idOutputVar === payload.idOutputVar) {
            return {
              ...outputVar,
              varName: action.payload.varName,
              varType: action.payload.varType,
              varValue: action.payload.varValue,
              varDefaultValue: action.payload.varDefaultValue,
              varEnum: action.payload.varEnum,
              varReadOnly: action.payload.varReadOnly,
            };
          }
          return outputVar;
        }),
      };
    default:
      return state;
  }
}
