import React, { useEffect, useState } from "react";
import {
  Title,
  Element,
  Label,
  Form,
  InputWrapper,
  Input,
  GeneralComponent,
  InputLongText,
  Elements,
} from "../style";

function GeneralJsonDataInput({ handleChange, state }) {
  const [placeholder, setPlaceholder] = useState("Type here...");
  const [isInputEmpty] = useState(true);

  const animatePlaceholder = () => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholder.slice(0, i));
      i++;
      if (i === placeholder.length) i = 0;
    }, 400);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (isInputEmpty) animatePlaceholder();
  }, [isInputEmpty]);

  return (
    <GeneralComponent>
      <Title>ECUE general data</Title>
      <Form>
        <Elements>
          <Element>
            <Label htmlFor="title">ECUE Title:</Label>
            <InputWrapper>
              <Input
                type="text"
                name="title"
                value={state.title}
                onChange={handleChange}
                placeholder={placeholder}
              />
            </InputWrapper>
          </Element>

          <Element>
            <Label htmlFor="name">ECUE Name:</Label>
            <InputWrapper>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder={placeholder}
              />
            </InputWrapper>
          </Element>

          <Element>
            <Label htmlFor="ID">ECUE Id:</Label>
            <InputWrapper>
              <Input
                type="number"
                name="ID"
                value={state.ID}
                onChange={handleChange}
                placeholder={placeholder}
              />
            </InputWrapper>
          </Element>

          <Element>
            <Label htmlFor="description">ECUE Description:</Label>
            <InputWrapper>
              <InputLongText
                type="text"
                name="description"
                value={state.description}
                onChange={handleChange}
                placeholder={placeholder}
              />
            </InputWrapper>
          </Element>
        </Elements>
      </Form>
    </GeneralComponent>
  );
}

export default GeneralJsonDataInput;
