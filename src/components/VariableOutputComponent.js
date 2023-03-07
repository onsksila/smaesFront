import React from "react";
import VariableOutputForm from "../forms/VariableOutputForm";
import { Title, GeneralComponent, AddButton, DeleteButton, CB } from "../style";

function VariableOutputComponent({
  SubmittedOutputVars,
  removeOutputVar,
  addOutputVariableInput,
}) {
  return (
    <GeneralComponent>
      <Title>Output Variables</Title>
      {SubmittedOutputVars.map((variable, index) => (
        <CB key={index}>
          <DeleteButton onClick={() => removeOutputVar(index)}>x</DeleteButton>
          <VariableOutputForm varOutput={variable} />
        </CB>
      ))}
      <br />
      <br />
      <AddButton onClick={addOutputVariableInput}>
        Add an output variable
      </AddButton>
    </GeneralComponent>
  );
}

export default VariableOutputComponent;
