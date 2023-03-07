import styled from "styled-components";
const RuleFormInputs = styled.form`
  display: flex;
  flex-direction: column;
`;
const GlobalRule = styled.div`
  display: flex;
  align-self: center;
  padding: 15px 50px;
  margin-bottom: 25px;
`;
const SubRules = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-self: flex-start;
  margin-bottom: 25px;
`;
const Element = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  flex: 1 0 25%;
  margin-bottom: 25px;
`;
const LabelRule = styled.label`
  margin: 50px 0 5px 0;
`;
const InputRule = styled.input`
  &:hover,
  &:active,
  &:focus {
    background-color: #f4f9fa;
  }
`;

const AddSubElement = styled.button`
  display: flex;
  align-self: center;
  margin: 2%;
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #23c4aa;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;
const AddSubElementFalse = styled.button`
  display: flex;
  align-self: center;
  margin: 2%;
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #23c4aa;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;
const DeleteSubElement = styled.button``;
const SubContainer = styled.div`
  margin: 0 2% 2% 2%;
  display: flex;
  flex-direction: column;
  border: 2px solid #e7e7e7;
  border-radius: 15px;
`;

const SubTitle = styled.h3`
  display: flex;
  align-self: center;
`;
export {
  LabelRule,
  InputRule,
  RuleFormInputs,
  Element,
  GlobalRule,
  SubRules,
  AddSubElement,
  DeleteSubElement,
  SubContainer,
  SubTitle,
  AddSubElementFalse,
};
