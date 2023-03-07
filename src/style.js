import styled from "styled-components";

const Title = styled.h3``;
const Element = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 33.33%;
`;
const Label = styled.label`
  margin: 20px 0 5px 10px;
`;
const InputLongText = styled.textarea`
  &:hover,
  &:active,
  &:focus {
    background-color: #f4f9fa;
  }
`;
const Input = styled.input`
  &:hover,
  &:active,
  &:focus {
    background-color: #f4f9fa;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Elements = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const InputWrapper = styled.div`
  input,
  textarea {
    background-color: #eee;
    border: none;
    padding: 1rem;
    font-size: 1rem;
    width: 10em;
    border-radius: 1rem;
    color: lightcoral;
    box-shadow: 0 0.4rem #dfd9d9;
    cursor: pointer;

    &:focus {
      outline-color: lightcoral;
    }
  }
`;
const JsonButton = styled.button`
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
    background-color: #23c483;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const JsonComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GeneralComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 2% 0;
`;

const CheckboxWrapper = styled.label`
  position: relative;
`;

const Checkmark = styled.label`
  display: block;
  width: 30px;
  height: 30px;
  background-color: #ddd;
  border-radius: 10px;
  position: absolute;
  transition: background-color 0.4s;
  overflow: hidden;
  cursor: pointer;
  top: 5px;
  left: 0;

  &::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 10px;
    border-right: 3px solid #fff;
    border-bottom: 3px solid #fff;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(40deg) scale(10);
    opacity: 0;
    transition: all 0.4s;
  }
  ${({ checked }) =>
    checked &&
    `
    background-color: #08bb68;
    &::after {
      opacity: 1;
      transform: translate(-50%, -50%) rotateZ(40deg) scale(1);
    }
  `}
  ${({ checkedOut }) =>
    checkedOut &&
    `
    background-color: #08bb68;
    &::after {
      opacity: 1;
      transform: translate(-50%, -50%) rotateZ(40deg) scale(1);
    }
  `}
`;

const Check = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const VariablesComponents = styled.div`
  display: flex;
  flex-direction: row;
`;
const VariableComponent = styled.div`
  flex: 1 0 33.33%;
  width: 100%;
  padding: 0;

  padding-left: 4.5%;
  /* box-sizing: border-box;
  border: 1px solid #e7e7e7; */
`;
const StyledLine = styled.div`
  height: auto;
  width: 1px;
  background-color: #e7e7e7;
`;
const CB = styled.div`
  margin: 2%;
  display: flex;
  flex-direction: column;
  border: 2px solid #e7e7e7;
  margin-right: 10px;
  border-radius: 15px;
`;
const AddButton = styled.button`
  display: flex;
  align-self: center;
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
const UpdateButton = styled.button`
  display: flex;
  align-self: flex-start;
  margin: 5px;
  padding: 0.65em 1em;
  font-size: 12px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #23aac4;
    box-shadow: 0px 15px 20px rgba(46, 150, 279, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;
const DeleteButton = styled.button`
  display: flex;
  align-self: flex-end;
  padding: 0.65em 1em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
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
    background-color: #c42323;
    box-shadow: 0px 15px 20px rgba(229, 46, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;
const SubmitButton = styled.button`
  display: flex;
  align-self: center;
  margin: 5% 2%;
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
    background-color: #c49123;
    box-shadow: 0px 15px 20px rgba(229, 157, 45, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Variable = styled.div`
  display: flex;
  width: 300px;
  flex-direction: row;
  justify-content: center;
  justify-self: center;
`;
const RuleUpdate = styled.div`
  display: flex;
  width: 100%;
  padding: 0 40px;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
`;

const VarName = styled.h5`
  margin: 0 10px 40px 0;
`;
const TitleSubrules = styled.h5`
  margin: 0;
`;
const Arrow = styled.span`
  margin: 0 8px;
  font-size: 20px;
  color: gray;
`;

const ColoredText = styled.span`
  color: #dc7171;
  text-transform: uppercase;
`;
export {
  RuleUpdate,
  Title,
  Element,
  Elements,
  Label,
  Form,
  InputWrapper,
  Input,
  Arrow,
  JsonButton,
  JsonComponent,
  GeneralComponent,
  InputLongText,
  Checkmark,
  TitleSubrules,
  Check,
  CheckboxWrapper,
  VariablesComponents,
  VariableComponent,
  StyledLine,
  AddButton,
  DeleteButton,
  SubmitButton,
  CB,
  UpdateButton,
  Variable,
  ColoredText,
  VarName,
};
