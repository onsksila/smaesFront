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
            type: payload.type,
            value: payload.value,
            default: payload.default,
            enum: payload.enum,
            readonly: payload.readonly,
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
            type: "",
            value: "",
            default: "",
            enum: "",
            readonly: "",
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
              type: action.payload.type,
              value: action.payload.value,
              default: action.payload.default,
              enum: action.payload.enum,
              readonly: action.payload.readonly,
            };
          }
          return inputVar;
        }),
      };

    default:
      return state;
  }
}
