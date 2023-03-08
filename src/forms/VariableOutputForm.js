import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { GrUpdate } from "@react-icons/all-files/gr/GrUpdate";
import { SubmitOutputVar } from "../redux/actions/variableOutput";
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
import EditOutputVarForm from "./EditOutputVarForm";

function VariableOutputForm({ SubmitOutputVar, varOutput }) {
  const [submitted, setSubmitted] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const [state, setState] = useState({
    idOutputVar: uuidv4(),
    varName: "",
    type: "",
    value: "",
    default: "",
    enum: "",
    readonly: "",
  });
  const onChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setCheckedOut(!checkedOut);
  };
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const splitedTypes = varOutput.type.includes("|")
    ? varOutput.type.split("|")
    : varOutput.type;

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
    <EditOutputVarForm
      submitted={submitted}
      setSubmitted={setSubmitted}
      checkedOut={checkedOut}
      setCheckedOut={setCheckedOut}
      onChangeCheck={onChangeCheck}
      state={state}
      setState={setState}
      varOutput={varOutput}
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
            SubmitOutputVar(state);
            setSubmitted(true);
          }}
        >
          <Elements>
            <Element>
              <Label htmlFor="type">Variable output name:</Label>
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
              <Label htmlFor="enum">Enum :</Label>
              <InputWrapper>
                <Input type="text" name="enum" onChange={onChange} />
              </InputWrapper>
            </Element>
            <Element>
              <Label htmlFor="readonly">Read only:</Label>
              <Input type="checkbox" name="readonly" onChange={onChange} />
              {/*<Label htmlFor="readonly">Read only:</Label>
              <CheckboxWrapper>
                <Check
                  checkedOut={checkedOut}
                  onChange={onChangeCheck}
                  id="checkedOut"
                  name="readonly"
                />
                <Checkmark htmlFor="checkedOut" checkedOut={checkedOut} />
        </CheckboxWrapper>*/}
            </Element>
          </Elements>

          <SubmitButton type="submit">Submit Output</SubmitButton>
        </Form>
      ) : (
        <>
          <Variable>
            <VarName>
              <ColoredText>{varOutput.varName}</ColoredText> is of type{" "}
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
export default connect(null, { SubmitOutputVar })(VariableOutputForm);
