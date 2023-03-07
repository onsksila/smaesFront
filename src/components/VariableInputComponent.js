import React from "react";
import VariableInputForm from "../forms/VariableInputForm";
import { Title, GeneralComponent, AddButton, DeleteButton, CB } from "../style";

function VariableInputComponent({
  SubmittedInputVars,
  removeInputVar,
  addInputVariable,
}) {
  return (
    <GeneralComponent>
      <Title>Input Variables</Title>
      {SubmittedInputVars.map((varInput, index) => (
        <CB key={index}>
          <DeleteButton onClick={() => removeInputVar(index)}>x</DeleteButton>
          <VariableInputForm varInput={varInput} />
        </CB>
      ))}
      <br />
      <br />
      <AddButton onClick={addInputVariable}>Add an input variable</AddButton>
    </GeneralComponent>
  );
}

export default VariableInputComponent;
