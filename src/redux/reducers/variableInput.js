import {
  ADD_INPUTVAR,
  ADD_INPUTVAR_INPUT,
  DELETE_INPUTVAR,
  EDIT_INPUTVAR,
} from "../types";

const initialState = {
  SubmittedInputVars: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_INPUTVAR:
      return {
        ...state,
        SubmittedInputVars: [
          ...state.SubmittedInputVars,
          {
            idInputVar: payload.idInputVar,
            varName: payload.varName,
            varType: payload.varType,
            varValue: payload.varValue,
            varDefaultValue: payload.varDefaultValue,
            varEnum: payload.varEnum,
            varReadOnly: payload.varReadOnly,
          },
        ].filter((varInput) => varInput.varName !== ""),
      };
    case DELETE_INPUTVAR:
      const updatedInputVars = [...state.SubmittedInputVars];
      //updatedInputVars.filter(payload, 1); ceci etait deja commenté
      // return index !== payload; a remplacer avec item.idVarInput
      //car le payload est maintenant un id generer automatiquement du variable input
      let filteredArray = updatedInputVars.filter((item, index) => {
        return index !== payload;
      });
      return {
        ...state,
        SubmittedInputVars: filteredArray,
      };
    case ADD_INPUTVAR_INPUT:
      return {
        ...state,
        SubmittedInputVars: [
          ...state.SubmittedInputVars,
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
    case EDIT_INPUTVAR:
      return {
        ...state,
        SubmittedInputVars: state.SubmittedInputVars.map((inputVar) => {
          if (inputVar.idInputVar === payload.idInputVar) {
            return {
              ...inputVar,
              varName: action.payload.varName,
              varType: action.payload.varType,
              varValue: action.payload.varValue,
              varDefaultValue: action.payload.varDefaultValue,
              varEnum: action.payload.varEnum,
              varReadOnly: action.payload.varReadOnly,
            };
          }
          return inputVar;
        }),
      };

    default:
      return state;
  }
}
