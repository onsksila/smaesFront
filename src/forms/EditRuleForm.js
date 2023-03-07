import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editRule } from "../redux/actions/rules";
function EditRuleForm({
  state,
  setState,
  rule,
  editRule,
  varInput,
  editClicked,
  setEditClicked,
}) {
  const [selectedVars, setSelectedVars] = useState([]);
  const [remainingVars, setRemainingVars] = useState(varInput);
  // const [list, setList] = useState([]);
  useEffect(() => {
    setRemainingVars((remainingVars) => {
      return [remainingVars, ...varInput];
    });
    // setList(list.concat(varInput));
  }, [varInput]);

  const handleGlobalRuleNameChange = (event) => {
    setState({
      ...state,
      globaleruleName: event.target.value,
    });
  };

  const handleChange = (event, subRuleIndex) => {
    const newSubRules = [...rule.subRules];
    newSubRules[subRuleIndex][event.target.name] = event.target.value;
    setState({
      ...state,
      subRules: newSubRules,
    });
  };
  const handleBindChange = (event, subRuleIndex, key, condition) => {
    if (!rule.subRules[subRuleIndex].Evaluation.output[condition].bind[key])
      return;
    if (condition !== "true" && condition !== "false") return;
    const newBind = {
      ...rule.subRules[subRuleIndex].Evaluation.output[condition].bind,
    };
    newBind[key][event.target.name] = event.target.value;
    const newSubRules = [...rule.subRules];
    newSubRules[subRuleIndex].Evaluation.output[condition].bind = newBind;
    setState({
      ...state,
      subRules: newSubRules,
    });
    setSelectedVars([...selectedVars, event.target.value]);
    setRemainingVars(
      remainingVars.filter((varInput) => varInput.id !== event.target.value)
    );
  };

  const addSubRule = () => {
    const newSubRule = {
      Id: "",
      title: "",
      Rule_Type: "",
      Evaluation: {
        Condition: "",
        output: {
          true: {
            bind: {},
          },
          false: {
            bind: {},
          },
        },
      },
    };
    setState({
      ...state,
      subRules: [...rule.subRules, newSubRule],
    });
  };

  const removeSubRule = (index) => {
    const newSubRules = [...rule.subRules];
    newSubRules.splice(index, 1);
    setState({
      ...state,
      subRules: newSubRules,
    });
  };
  const handleConditionChange = (event, subRuleIndex) => {
    const newSubRules = [...state.subRules];
    newSubRules[subRuleIndex].Evaluation.Condition = event.target.value;
    setState({
      ...state,
      subRules: newSubRules,
    });
  };

  const addBind = (subRuleIndex, condition) => {
    const newBind = {
      ...rule.subRules[subRuleIndex].Evaluation.output[condition].bind,
      [`bind${
        Object.keys(
          rule.subRules[subRuleIndex].Evaluation.output[condition].bind
        ).length + 1
      }`]: { variable: "", value: "" },
    };
    const newSubRules = [...rule.subRules];
    newSubRules[subRuleIndex].Evaluation.output[condition].bind = newBind;
    setState({
      ...state,
      subRules: newSubRules,
    });
  };

  const removeBind = (subRuleIndex, key, condition) => {
    delete rule.subRules[subRuleIndex].Evaluation.output[condition].bind[key];
    setState({
      ...state,
    });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        editRule(state);
        setEditClicked(!editClicked);
      }}
    >
      <label htmlFor="globaleruleName">Nom de la règle globale :</label>
      <input
        type="text"
        name="globaleruleName"
        value={state.globaleruleName}
        onChange={(event) => handleGlobalRuleNameChange(event)}
      />
      {rule.subRules.map((subRule, subRuleIndex) => (
        <div key={subRuleIndex}>
          <label htmlFor={`Id${subRuleIndex}`}>Id de la sous-règle :</label>
          <input
            type="text"
            name="Id"
            value={subRule.Id}
            onChange={(event) => handleChange(event, subRuleIndex)}
          />
          <label htmlFor={`title${subRuleIndex}`}>
            Titre de la sous-règle :
          </label>
          <input
            type="text"
            name="title"
            value={subRule.title}
            onChange={(event) => handleChange(event, subRuleIndex)}
          />
          <label htmlFor={`Rule_Type${subRuleIndex}`}>
            Type de sous-règle :
          </label>
          <input
            type="text"
            name="Rule_Type"
            value={subRule.Rule_Type}
            onChange={(event) => handleChange(event, subRuleIndex)}
          />
          <label htmlFor={`Condition${subRuleIndex}`}>Condition :</label>
          <input
            type="text"
            name="Condition"
            value={subRule.Evaluation.Condition}
            onChange={(event) => handleConditionChange(event, subRuleIndex)}
          />
          {Object.entries(subRule.Evaluation.output.true.bind).map(
            ([key, value]) => (
              <div key={key}>
                <label htmlFor={`bindTrueVariable${subRuleIndex}${key}`}>
                  Variable (si vrai) :
                </label>
                <select
                  name="variable"
                  onChange={(event) =>
                    handleBindChange(event, subRuleIndex, key, "true")
                  }
                  value={
                    rule.subRules[subRuleIndex].Evaluation.output.true.bind[key]
                      .variable
                  }
                >
                  {remainingVars.map((input, index) => (
                    <option key={`${(input.id, index)}`} value={input.id}>
                      {input.varName}
                    </option>
                  ))}
                </select>
                <label htmlFor={`bindTrueValue${subRuleIndex}${key}`}>
                  Valeur (si vrai) :
                </label>
                <input
                  type="text"
                  name="value"
                  value={value.value}
                  onChange={(event) =>
                    handleBindChange(event, subRuleIndex, key, "true")
                  }
                />
                <button
                  type="button"
                  onClick={() => removeBind(subRuleIndex, key, "true")}
                >
                  Supprimer
                </button>
              </div>
            )
          )}
          <button type="button" onClick={() => addBind(subRuleIndex, "true")}>
            Ajouter un bind (si vrai)
          </button>
          {Object.entries(subRule.Evaluation.output.false.bind).map(
            ([key, value]) => (
              <div key={key}>
                <label htmlFor={`bindFalseVariable${subRuleIndex}${key}`}>
                  Variable (si faux) :
                </label>
                <select
                  name="variable"
                  onChange={(event) =>
                    handleBindChange(event, subRuleIndex, key, "false")
                  }
                  value={
                    rule.subRules[subRuleIndex].Evaluation.output.false.bind[
                      key
                    ].variable
                  }
                >
                  {remainingVars.map((input, index) => (
                    <option key={`${(input.id, index)}`} value={input.id}>
                      {input.varName}
                    </option>
                  ))}
                </select>
                <label htmlFor={`bindFalseValue${subRuleIndex}${key}`}>
                  Valeur (si faux) :
                </label>
                <input
                  type="text"
                  name="value"
                  value={value.value}
                  onChange={(event) =>
                    handleBindChange(event, subRuleIndex, key, "false")
                  }
                />
                <button
                  type="button"
                  onClick={() => removeBind(subRuleIndex, key, "false")}
                >
                  Supprimer
                </button>
              </div>
            )
          )}
          <button type="button" onClick={() => addBind(subRuleIndex, "false")}>
            Ajouter un bind (si faux)
          </button>
          <button type="button" onClick={() => removeSubRule(subRuleIndex)}>
            Supprimer cette sous-règle
          </button>
        </div>
      ))}
      <button type="button" onClick={addSubRule}>
        Ajouter une sous-règle
      </button>
      <button type="submit"> Update</button>
    </form>
  );
}

export default connect(null, { editRule })(EditRuleForm);
