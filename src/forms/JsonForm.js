import React, { useEffect, useState } from "react";
import { removeRule, addRuleInput } from "../redux/actions/rules";
import {
  removeInputVar,
  addInputVariable,
} from "../redux/actions/variableInput";
import {
  removeOutputVar,
  addOutputVariableInput,
} from "../redux/actions/variableOutput";
import { saveAs } from "file-saver";
import { connect } from "react-redux";
import GeneralJsonDataInput from "../components/GeneralJsonDataInput";
import VariableInputComponent from "../components/VariableInputComponent";
import VariableOutputComponent from "../components/VariableOutputComponent";
import RuleComponent from "../components/RuleComponent";

import {
  JsonButton,
  JsonComponent,
  VariablesComponents,
  VariableComponent,
  StyledLine,
} from "../style";

const JsonForm = ({
  rules: { SubmittedRules },
  variableInput: { SubmittedInputVars },
  variableOutput: { SubmittedOutputVars },
  removeInputVar,
  removeRule,
  addRuleInput,
  addInputVariable,
  removeOutputVar,
  addOutputVariableInput,
}) => {
  useEffect(() => {}, [SubmittedInputVars]);
  const [state, setState] = useState({
    title: "",
    name: "",
    ID: "",
    description: "",
    input_variables: {},
    output_variables: {},
    Rules: {},
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  function generateJSON() {
    const json = {
      title: state.title,
      name: state.name,
      ID: state.ID,
      description: state.description,
      input_variables: {},
      output_variables: {},
      Rules: {},
    };

    SubmittedInputVars.forEach((variable, index) => {
      let { varName, ...rest } = variable;
      json.input_variables[`${variable.varName}`] = rest;
    });

    SubmittedOutputVars.forEach((variable, index) => {
      let { varName, ...rest } = variable;
      json.output_variables[`${variable.varName}`] = rest;
    });

    const mergeBindObject = (conditionRes) => {
      let bindArray = Object.values(conditionRes);

      let keysBind = bindArray.map((key, v) => {
        let { variable } = key;
        return variable;
      });
      let valueBind = bindArray.map((key, v) => {
        let { value } = key;
        return value;
      });
      let newBinds = keysBind.map((k, index) => {
        return { [k]: valueBind[index] };
      });
      let mergedBindObject = Object.assign({}, ...newBinds);
      return mergedBindObject;
    };

    SubmittedRules.forEach((rule, index) => {
      json.Rules[rule.globaleruleName] = {};
      rule.subRules.forEach((subRule, i) => {
        if (
          Object.keys(mergeBindObject(subRule.Evaluation.output.false.bind))
            .length === 0 &&
          Object.keys(mergeBindObject(subRule.Evaluation.output.true.bind))
            .length !== 0
        ) {
          console.log("Object is empty");
          json.Rules[rule.globaleruleName][`R${i + 1}`] = {
            Id: subRule.Id,
            title: subRule.title,
            Rule_Type: subRule.Rule_Type,
            Evaluation: {
              Condition: subRule.Evaluation.Condition,
              output: {
                true: {
                  bind: mergeBindObject(subRule.Evaluation.output.true.bind),
                },
              },
            },
          };
        } else if (
          Object.keys(mergeBindObject(subRule.Evaluation.output.true.bind))
            .length === 0 &&
          Object.keys(mergeBindObject(subRule.Evaluation.output.false.bind))
            .length !== 0
        ) {
          json.Rules[rule.globaleruleName][`R${i + 1}`] = {
            Id: subRule.Id,
            title: subRule.title,
            Rule_Type: subRule.Rule_Type,
            Evaluation: {
              Condition: subRule.Evaluation.Condition,
              output: {
                false: {
                  bind: mergeBindObject(subRule.Evaluation.output.false.bind),
                },
              },
            },
          };
        } else if (
          Object.keys(mergeBindObject(subRule.Evaluation.output.true.bind))
            .length === 0 &&
          Object.keys(mergeBindObject(subRule.Evaluation.output.false.bind))
            .length === 0
        ) {
          json.Rules[rule.globaleruleName][`R${i + 1}`] = {
            Id: subRule.Id,
            title: subRule.title,
            Rule_Type: subRule.Rule_Type,
            Evaluation: {
              Condition: subRule.Evaluation.Condition,
            },
          };
        } else
          json.Rules[rule.globaleruleName][`R${i + 1}`] = {
            Id: subRule.Id,
            title: subRule.title,
            Rule_Type: subRule.Rule_Type,
            Evaluation: {
              Condition: subRule.Evaluation.Condition,
              output: {
                true: {
                  bind: mergeBindObject(subRule.Evaluation.output.true.bind),
                },
                false: {
                  bind: mergeBindObject(subRule.Evaluation.output.false.bind),
                },
              },
            },
          };
      });
    });

    const jsonString = JSON.stringify(json, null, 2);

    saveAs(
      new Blob([jsonString], { type: "application/json;charset=utf-8" }),
      `${state.title}.json`
    );

    alert("Le fichier a été créé avec succès !");
  }

  return (
    <JsonComponent>
      <GeneralJsonDataInput handleChange={handleChange} state={state} />

      <VariablesComponents>
        <VariableComponent>
          <VariableInputComponent
            addInputVariable={addInputVariable}
            SubmittedInputVars={SubmittedInputVars}
            removeInputVar={removeInputVar}
          />
        </VariableComponent>
        <StyledLine />
        <VariableComponent>
          <VariableOutputComponent
            SubmittedOutputVars={SubmittedOutputVars}
            removeOutputVar={removeOutputVar}
            addOutputVariableInput={addOutputVariableInput}
          />
        </VariableComponent>
      </VariablesComponents>

      <RuleComponent
        SubmittedRules={SubmittedRules}
        removeRule={removeRule}
        addRuleInput={addRuleInput}
        SubmittedInputVars={SubmittedInputVars}
      />
      <JsonButton onClick={generateJSON}>Create the JSON file</JsonButton>
    </JsonComponent>
  );
};
const mapStateToProps = (state) => {
  return {
    rules: state.rules,
    variableInput: state.variableInput,
    variableOutput: state.variableOutput,
  };
};

export default connect(mapStateToProps, {
  removeRule,
  addRuleInput,
  addInputVariable,
  removeInputVar,
  removeOutputVar,
  addOutputVariableInput,
})(JsonForm);
