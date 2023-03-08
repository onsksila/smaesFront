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
          <Label htmlFor="readonly">Read only:</Label>
          <Input type="checkbox" name="readonly" onChange={onChange} />
          {/*  <Label htmlFor="readonly">Read only:</Label>
          <CheckboxWrapper>
            <Check
              checked={checkedOut}
              onChange={onChange}
              id="check"
              name="readonly"
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
