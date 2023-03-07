import React from "react";
import RuleForm from "../forms/RuleForm";
import { Title, GeneralComponent, AddButton, DeleteButton, CB } from "../style";
function RuleComponent({
  SubmittedRules,
  removeRule,
  SubmittedInputVars,
  addRuleInput,
}) {
  return (
    <GeneralComponent>
      <Title>Rules</Title>
      {SubmittedRules.map((rule, index) => (
        <CB key={index}>
          <DeleteButton onClick={() => removeRule(index)}>x</DeleteButton>
          <RuleForm rule={rule} varInput={SubmittedInputVars} />
        </CB>
      ))}
      <br />
      <AddButton onClick={addRuleInput}>Add rule</AddButton>
    </GeneralComponent>
  );
}

export default RuleComponent;
