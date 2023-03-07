import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { SubmitRule } from "../redux/actions/rules";
import EditRuleForm from "./EditRuleForm";
import {
  UpdateButton,
  InputWrapper,
  Label,
  Input,
  DeleteButton,
  AddButton,
  SubmitButton,
  ColoredText,
  RuleUpdate,
  VarName,
  TitleSubrules,
} from "../style";
import {
  RuleFormInputs,
  Element,
  GlobalRule,
  SubRules,
  InputRule,
  LabelRule,
  AddSubElement,
  AddSubElementFalse,
  DeleteSubElement,
  SubTitle,
  SubContainer,
} from "../rulesStyle";
import { GrUpdate } from "@react-icons/all-files/gr/GrUpdate";

// import InputSuggetion from "../components/InputSuggetion";
function RuleForm({ SubmitRule, rule, varInput }) {
  const [state, setState] = useState({
    idRule: uuidv4(),
    globaleruleName: "",
    subRules: [
      {
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
      },
    ],
  });
  const [showListTrue, setShowListTrue] = useState(false);
  const [showListFalse, setShowListFalse] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    const newSubRules = [...state.subRules];
    newSubRules[subRuleIndex][event.target.name] = event.target.value;
    setState({
      ...state,
      subRules: newSubRules,
    });
  };
  const handleBindChange = (event, subRuleIndex, key, condition) => {
    if (!state.subRules[subRuleIndex].Evaluation.output[condition].bind[key])
      return;
    if (condition !== "true" && condition !== "false") return;
    const newBind = {
      ...state.subRules[subRuleIndex].Evaluation.output[condition].bind,
    };
    newBind[key][event.target.name] = event.target.value;
    const newSubRules = [...state.subRules];
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
      subRules: [...state.subRules, newSubRule],
    });
  };

  const removeSubRule = (index) => {
    const newSubRules = [...state.subRules];
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
      ...state.subRules[subRuleIndex].Evaluation.output[condition].bind,
      [`bind${
        Object.keys(
          state.subRules[subRuleIndex].Evaluation.output[condition].bind
        ).length + 1
      }`]: { variable: "", value: "" },
    };
    const newSubRules = [...state.subRules];
    newSubRules[subRuleIndex].Evaluation.output[condition].bind = newBind;
    setState({
      ...state,
      subRules: newSubRules,
    });
  };

  const removeBind = (subRuleIndex, key, condition) => {
    delete state.subRules[subRuleIndex].Evaluation.output[condition].bind[key];
    setState({
      ...state,
    });
  };
  const [editClicked, setEditClicked] = useState(false);
  const showEditComp = editClicked ? (
    <EditRuleForm
      submitted={submitted}
      setSubmitted={setSubmitted}
      rule={rule}
      state={state}
      setState={setState}
      varInput={varInput}
      SubmitRule={SubmitRule}
      editClicked={editClicked}
      setEditClicked={setEditClicked}
    />
  ) : null;
  const showEditCompFunct = (rule) => {
    setEditClicked(!editClicked);
  };
  return (
    <>
      {!submitted ? (
        <RuleFormInputs
          onSubmit={(event) => {
            event.preventDefault();
            SubmitRule(state);
            setSubmitted(true);
          }}
        >
          <GlobalRule>
            <Label htmlFor="globaleruleName">Nom de la règle globale :</Label>
            <InputWrapper>
              <Input
                type="text"
                name="globaleruleName"
                value={state.globaleruleName}
                onChange={handleGlobalRuleNameChange}
              />
            </InputWrapper>
          </GlobalRule>

          {state.subRules.map((subRule, subRuleIndex) => (
            <SubContainer>
              <DeleteButton
                type="button"
                onClick={() => removeSubRule(subRuleIndex)}
              >
                X{" "}
              </DeleteButton>
              <SubTitle>Sub element :</SubTitle>

              <SubRules key={subRuleIndex}>
                <Element>
                  <LabelRule htmlFor={`Id${subRuleIndex}`}>
                    Id de la sous-règle :
                  </LabelRule>
                  <InputWrapper>
                    <InputRule
                      type="text"
                      name="Id"
                      value={subRule.Id}
                      onChange={(event) => handleChange(event, subRuleIndex)}
                    />
                  </InputWrapper>
                </Element>
                <Element>
                  <LabelRule htmlFor={`title${subRuleIndex}`}>
                    Titre de la sous-règle :
                  </LabelRule>
                  <InputWrapper>
                    <InputRule
                      type="text"
                      name="title"
                      value={subRule.title}
                      onChange={(event) => handleChange(event, subRuleIndex)}
                    />
                  </InputWrapper>
                </Element>
                <Element>
                  <LabelRule htmlFor={`Rule_Type${subRuleIndex}`}>
                    Type de sous-règle :
                  </LabelRule>
                  <InputWrapper>
                    <InputRule
                      type="text"
                      name="Rule_Type"
                      value={subRule.Rule_Type}
                      onChange={(event) => handleChange(event, subRuleIndex)}
                    />
                  </InputWrapper>
                </Element>
                <Element>
                  <LabelRule htmlFor={`Condition${subRuleIndex}`}>
                    Condition :
                  </LabelRule>
                  <InputWrapper>
                    <InputRule
                      type="text"
                      name="Condition"
                      value={subRule.Evaluation.Condition}
                      onChange={(event) =>
                        handleConditionChange(event, subRuleIndex)
                      }
                    />
                  </InputWrapper>
                </Element>
                {showListTrue && (
                  <div
                    style={{
                      marginBottom: "10px",
                      overflowY: "scroll",
                      height: "100px",
                    }}
                  >
                    {Object.entries(subRule.Evaluation.output.true.bind).map(
                      ([key, value]) => (
                        <div key={key}>
                          <label
                            htmlFor={`bindTrueVariable${subRuleIndex}${key}`}
                          >
                            Variable (si vrai) :
                          </label>
                          <select
                            name="variable"
                            onChange={(event) =>
                              handleBindChange(event, subRuleIndex, key, "true")
                            }
                            value={
                              state.subRules[subRuleIndex].Evaluation.output
                                .true.bind[key].variable
                            }
                          >
                            {remainingVars.map((input, index) => (
                              <option
                                key={`${(input.id, index)}`}
                                value={input.id}
                              >
                                {/* {input.varName} */}
                                {`@${input.varName}`}
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
                          <DeleteSubElement
                            type="button"
                            onClick={() =>
                              removeBind(subRuleIndex, key, "true")
                            }
                          >
                            Supprimer le bind
                          </DeleteSubElement>
                        </div>
                      )
                    )}
                  </div>
                )}

                <AddSubElement
                  type="button"
                  onClick={() => {
                    addBind(subRuleIndex, "true");
                    setShowListTrue(true);
                  }}
                >
                  Add bind (if True)
                </AddSubElement>
                {showListFalse && (
                  <div
                    style={{
                      marginTop: "10px",
                      overflowY: "scroll",
                      height: "100px",
                    }}
                  >
                    {Object.entries(subRule.Evaluation.output.false.bind).map(
                      ([key, value]) => (
                        <div key={key}>
                          <label
                            htmlFor={`bindFalseVariable${subRuleIndex}${key}`}
                          >
                            Variable (si faux) :
                          </label>
                          <select
                            name="variable"
                            onChange={(event) =>
                              handleBindChange(
                                event,
                                subRuleIndex,
                                key,
                                "false"
                              )
                            }
                            value={
                              state.subRules[subRuleIndex].Evaluation.output
                                .false.bind[key].variable
                            }
                          >
                            {remainingVars.map((input, index) => (
                              <option
                                key={`${(input.id, index)}`}
                                value={input.id}
                              >
                                {/* {input.varName} */}
                                {`@${input.varName}`}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor={`bindFalseValue${subRuleIndex}${key}`}
                          >
                            Valeur (si faux) :
                          </label>
                          <input
                            type="text"
                            name="value"
                            value={value.value}
                            onChange={(event) =>
                              handleBindChange(
                                event,
                                subRuleIndex,
                                key,
                                "false"
                              )
                            }
                          />
                          <DeleteSubElement
                            type="button"
                            onClick={() =>
                              removeBind(subRuleIndex, key, "false")
                            }
                          >
                            Supprimer le bind
                          </DeleteSubElement>
                        </div>
                      )
                    )}
                  </div>
                )}

                <AddSubElementFalse
                  type="button"
                  onClick={() => {
                    addBind(subRuleIndex, "false");
                    setShowListFalse(true);
                  }}
                >
                  Add bind (if False)
                </AddSubElementFalse>
              </SubRules>
            </SubContainer>
          ))}
          <AddButton type="button" onClick={addSubRule}>
            Ajouter une sous-règle
          </AddButton>
          <SubmitButton type="submit"> submit Rule</SubmitButton>
        </RuleFormInputs>
      ) : (
        <RuleUpdate>
          <div>
            <VarName>
              Global rule : <ColoredText>{rule.globaleruleName}</ColoredText>
            </VarName>
          </div>
          <TitleSubrules>subrules:</TitleSubrules>
          <ul>
            {rule.subRules.map((s) => {
              return (
                <li key={s.Id}>
                  <div>
                    <ColoredText>{s.Id}</ColoredText>
                  </div>
                  <ul>
                    <li>Evaluation : {s.Evaluation.Condition} </li>
                  </ul>
                </li>
              );
            })}
          </ul>
          {editClicked ? null : (
            <UpdateButton
              type="button"
              onClick={(e) => {
                showEditCompFunct(rule);
              }}
            >
              <GrUpdate />
            </UpdateButton>
          )}
          {showEditComp}
        </RuleUpdate>
      )}
    </>
  );
}
export default connect(null, { SubmitRule })(RuleForm);
