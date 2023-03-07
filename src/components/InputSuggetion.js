import Autosuggest from "react-autosuggest";
import { useState, useEffect } from "react";

const InputSuggetion = ({ list }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, { newValue }) => {
    setInputValue(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    if (value[0] === "@") {
      const inputValue = value.slice(1);
      const suggestions = list.filter((item) =>
        item.varName.startsWith(inputValue)
      );
      setSuggestions(suggestions);
    }
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Type @ to see variables",
    value: inputValue,
    onChange: handleInputChange,
  };

  useEffect(() => {
    handleSuggestionsFetchRequested({ value: inputValue });
  }, [list, inputValue]);

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.varName}
        renderSuggestion={(suggestion) => <span>{suggestion.varName}</span>}
        inputProps={inputProps}
      />
    </div>
  );
};
export default InputSuggetion;
