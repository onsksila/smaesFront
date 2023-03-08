import React from "react";
import { connect } from "react-redux";
import { editInputVariable } from "../redux/actions/variableInput";
import {
  Form,
  Element,
  Input,
  Label,
  InputWrapper,
  Checkmark,
  Check,
  CheckboxWrapper,
  SubmitButton,
  Elements,
} from "../style";
const EditInputVarForm = ({
  editInputVariable,
  checked,
  state,
  onChangeCheck,
  setState,
  editClicked,
  setEditClicked,
}) => {
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        editInputVariable(state);
        setEditClicked(!editClicked);
      }}
    >
      <Elements>
        <Element>
          <Label htmlFor="type">Variable input name:</Label>
          <InputWrapper>
            <Input
              type="text"
              name="varName"
              value={state.varName}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          <Label htmlFor="type">Type:</Label>
          <InputWrapper>
            <Input
              type="text"
              name="type"
              value={state.type}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          <Label htmlFor="value">Value:</Label>
          <InputWrapper>
            <Input
              type="text"
              name="value"
              value={state.value}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          <Label htmlFor="default">Default value:</Label>
          <InputWrapper>
            <Input
              type="text"
              name="default"
              value={state.default}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          <Label htmlFor="enum">Enum:</Label>
          <InputWrapper>
            <Input
              type="text"
              name="enum"
              value={state.enum}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          {/* <Label htmlFor="readonly">Lecture seule :</Label>
    <Input type="checkbox" name="readonly" onChange={onChange} /> */}
          <Label htmlFor="readonly">Read only:</Label>
          <CheckboxWrapper>
            <Check
              checked={checked}
              onChange={onChangeCheck}
              id="check"
              name="readonly"
            />
            <Checkmark htmlFor="check" checked={checked} />
          </CheckboxWrapper>
        </Element>
      </Elements>
      <SubmitButton type="submit">Update Input</SubmitButton>
    </Form>
  );
};

export default connect(null, { editInputVariable })(EditInputVarForm);
