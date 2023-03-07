import React from "react";
import { connect } from "react-redux";
import { editOutputVariable } from "../redux/actions/variableOutput";
import {
  Form,
  Element,
  Input,
  Label,
  InputWrapper,
  SubmitButton,
  Elements,
} from "../style";
const EditOutputVarForm = ({
  editOutputVariable,

  setSubmitted,

  state,

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
        editOutputVariable(state);
        setSubmitted(true);
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
              name="varType"
              value={state.varType}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          <Label htmlFor="value">Value:</Label>
          <InputWrapper>
            <Input
              type="text"
              name="varValue"
              value={state.varValue}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          <Label htmlFor="default">Default value:</Label>
          <InputWrapper>
            <Input
              type="text"
              name="varDefaultValue"
              value={state.varDefaultValue}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          <Label htmlFor="enum">Enum:</Label>
          <InputWrapper>
            <Input
              type="text"
              name="varEnum"
              value={state.varEnum}
              onChange={onChange}
            />
          </InputWrapper>
        </Element>
        <Element>
          <Label htmlFor="readonly">Read only:</Label>
          <Input type="checkbox" name="varReadOnly" onChange={onChange} />
          {/*  <Label htmlFor="readonly">Read only:</Label>
          <CheckboxWrapper>
            <Check
              checked={checkedOut}
              onChange={onChange}
              id="check"
              name="varReadOnly"
            />
            <Checkmark htmlFor="check" checked={checked} />
    </CheckboxWrapper>*/}
        </Element>
      </Elements>

      <SubmitButton type="submit">Update Output</SubmitButton>
    </Form>
  );
};

export default connect(null, { editOutputVariable })(EditOutputVarForm);
