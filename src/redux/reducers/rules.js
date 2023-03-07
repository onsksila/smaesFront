import { EDIT_RULE, ADD_RULE, ADD_RULE_INPUT, DELETE_RULE } from "../types";

const initialState = {
  SubmittedRules: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_RULE:
      return {
        ...state,
        SubmittedRules: [
          ...state.SubmittedRules,
          {
            idRule: payload.idRule,
            globaleruleName: payload.globaleruleName,
            subRules: payload.subRules,
          },
        ].filter((rule) => rule.globaleruleName !== ""),
      };
    case DELETE_RULE:
      const updatedRules = [...state.SubmittedRules];
      updatedRules.splice(payload, 1);
      return {
        ...state,
        SubmittedRules: updatedRules,
      };
    case ADD_RULE_INPUT:
      return {
        ...state,
        SubmittedRules: [
          ...state.SubmittedRules,
          {
            globaleruleName: "",
            subRules: [],
          },
        ],
      };
    case EDIT_RULE:
      return {
        ...state,
        SubmittedRules: state.SubmittedRules.map((rule) => {
          if (rule.idRule === payload.idRule) {
            return {
              ...rule,
              globaleruleName: payload.globaleruleName,
              subRules: payload.subRules,
            };
          }
          return rule;
        }),
      };

    default:
      return state;
  }
}
