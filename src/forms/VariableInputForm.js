import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { SubmitInputVar } from "../redux/actions/variableInput";
import { GrUpdate } from "@react-icons/all-files/gr/GrUpdate";
import {
  Form,
  Element,
  Input,
  Label,
  InputWrapper,
  SubmitButton,
  Elements,
  VarName,
  Variable,
  ColoredText,
  UpdateButton,
} from "../style";
import EditInputVarForm from "./EditInputVarForm";

function VariableInputForm({ SubmitInputVar, varInput }) {
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState({
    idInputVar: uuidv4(),
    varName: "",
    type: "",
    value: "",
    default: "",
    enum: "",
    readonly: "",
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setChecked(!checked);
  };

  const splitedTypes = varInput.type.includes("|")
    ? varInput.type.split("|")
    : varInput.type;

  const displayTypes =
    typeof splitedTypes === "object" ? (
      <div>
        {splitedTypes.map((type, index) => {
          return <li key={index}>{type}</li>;
        })}
      </div>
    ) : (
      <li>{splitedTypes}</li>
    );

  const [editClicked, setEditClicked] = useState(false);
  const showEditComp = editClicked ? (
    <EditInputVarForm
      submitted={submitted}
      setSubmitted={setSubmitted}
      checked={checked}
      setChecked={setChecked}
      onChangeCheck={onChangeCheck}
      state={state}
      setState={setState}
      varInput={varInput}
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
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            SubmitInputVar(state);
            setSubmitted(true);
          }}
        >
          <Elements>
            <Element>
              <Label htmlFor="type">Variable input name:</Label>
              <InputWrapper>
                <Input type="text" name="varName" onChange={onChange} />
              </InputWrapper>
            </Element>
            <Element>
              <Label htmlFor="type">Type:</Label>
              <InputWrapper>
                <Input type="text" name="type" onChange={onChange} />
              </InputWrapper>
            </Element>
            <Element>
              <Label htmlFor="value">Value:</Label>
              <InputWrapper>
                <Input type="text" name="value" onChange={onChange} />
              </InputWrapper>
            </Element>
            <Element>
              <Label htmlFor="default">Default value:</Label>
              <InputWrapper>
                <Input type="text" name="default" onChange={onChange} />
              </InputWrapper>
            </Element>
            <Element>
              <Label htmlFor="enum">Enum:</Label>
              <InputWrapper>
                <Input type="text" name="enum" onChange={onChange} />
              </InputWrapper>
            </Element>
            <Element>
              <Label htmlFor="readonly">Read only:</Label>
              <Input type="checkbox" name="readonly" onChange={onChange} />
            </Element>
          </Elements>
          <SubmitButton type="submit">Submit Input</SubmitButton>
        </Form>
      ) : (
        <>
          <Variable>
            <VarName>
              <ColoredText>{varInput.varName}</ColoredText> is of type{" "}
            </VarName>{" "}
            {displayTypes}
          </Variable>
          {editClicked ? null : (
            <UpdateButton
              type="button"
              onClick={(e) => {
                showEditCompFunct(state);
              }}
            >
              <GrUpdate />
            </UpdateButton>
          )}
          {showEditComp}
        </>
      )}
    </>
  );
}

export default connect(null, { SubmitInputVar })(VariableInputForm);
