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
            type: payload.type,
            value: payload.value,
            default: payload.default,
            enum: payload.enum,
            readonly: payload.readonly,
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
            type: "",
            value: "",
            default: "",
            enum: "",
            readonly: "",
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
              type: action.payload.type,
              value: action.payload.value,
              default: action.payload.default,
              enum: action.payload.enum,
              readonly: action.payload.readonly,
            };
          }
          return outputVar;
        }),
      };
    default:
      return state;
  }
}
